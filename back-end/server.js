import express, { json } from "express";
import { Pool } from "pg";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import { authenticateToken } from "./middleware/authenticateToken.js";

const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.PGHOST,
  port: 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    mode: process.env.PGSSLMODE,
    channel_binding: process.env.PGCHANNELBINDING,
  },
  max: 5, //max de conexões simultaneas
  min: 1, // minimo de conexões simultaneas
  connectionTimeoutMillis: 5000, // Timeout para conectar
  acquireTimeoutMillis: 60000, // Timeout para pegar conexão do pool
  statement_timeout: 30000, // Timeout para queries
  idleTimeoutMillis: 30000, // Fechar conexões inativas
  allowExitOnIdle: false, // Não deixar pool morrer
});

pool.on("error", (err, client) => {
  console.log("Unexpected error on pool: ", err);
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// +-- Routes ---+

//get users
app.get("/api/users", async (req, res) => {
  try {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Error in query: ${error}`,
    });
  }
});

//register new user
app.post("/api/users", async (req, res) => {
  try {
    const { email, password, name, user_type } = req.body;
    if (!email || !password || !name || !user_type) {
      return res.status(404).json({
        success: false,
        msg: "missing body components",
      });
    }
    if (!["aluno", "copex", "empresa"].includes(user_type))
      return res.status(404).json({
        success: false,
        msg: "Invalid user_type",
      });

    const query =
      "INSERT INTO users (email, password, name, user_type) VALUES ($1, $2, $3, $4)";
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(query, [email, hash, name, user_type]);
    res.status(201).json({
      success: true,
      msg: `Sucessfully registered ${name}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: `Error in query: ${error}`,
    });
  }
});

// Validates if email is not in use
app.get("/api/users/check-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    if (!email)
      return res.status(400).json({
        success: false,
        msg: `Invalid body components`,
      });

    const result = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE email = $1",
      [email]
    );

    const exists = parseInt(result.rows[0].count) > 0;

    return res.status(200).json({
      success: true,
      exists,
      msg: exists ? "Avaible email" : "Email already in use",
    });
  } catch (error) {
    console.log(`Error checking email: ${error}`);
    res.status(500).json({
      success: false,
      msg: `Error checking email: ${error}`,
    });
  }
});

//user login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        msg: `Missing body components`,
      });
    const query = "SELECT * FROM users WHERE email = $1 LIMIT 1";
    const result = await pool.query(query, [email]);
    if (!result || result.rowCount === 0)
      return res.status(401).json({
        success: false,
        msg: `invalid credentials`,
      });
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        msg: "invalid credentials",
      });

    const token = jwt.sign(
      {
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        userType: user.user_type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.cookie("authToken", token, {
      httpOnly: true, //só pode ser acessado por requisição http
      secure: process.env.STAGE === "production", //só por https
      sameSite: "strict", //Somente requisições do mesmo site são respondidas
      maxAge: 12 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        user_type: user.user_type,
      },
    });
  } catch (error) {
    console.log(`Login Error: ${error}`);
    return res.status(500).json({
      success: false,
      msg: `Login Error: ${error}`,
    });
  }
});

// get autenticated user
app.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users_safe WHERE id = $1 LIMIT 1",
      [req.user.userId]
    );
    if (result.rowCount === 0)
      return res.status(500).json({
        success: false,
        msg: `No user found with id ${req.user.userId}`,
      });

    return res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.log(`Error getting user: ${error}`);
    res.status(500).json({
      success: false,
      msg: `Error getting user: ${error}`,
    });
  }
});

// user logout
app.post("/api/users/logout", authenticateToken, (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({
      success: true,
      msg: "Sucessfully logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Error in logout",
    });
  }
});

//get vagas
app.get("/api/vagas", async (req, res) => {
  try {
    let query = `
      SELECT v.*, c.nome AS curso_nome, c.id AS curso_id FROM vagas v 
      JOIN vagas_cursos vc ON v.id = vc.vaga_id 
      JOIN cursos c ON vc.curso_id = c.id 
      `;
    const params = [];
    const whereConditions = [];

    if (req.query.cidade) {
      whereConditions.push(`v.cidade = $${params.length + 1} `);
      params.push(req.query.cidade);
    }

    if (req.query.curso_id) {
      const cursoId = parseInt(req.query.curso_id);

      if (isNaN(cursoId))
        return res.status(400).json({
          success: false,
          msg: "Error curso_id must be a number",
        });

      whereConditions.push(`vc.curso_id = $${params.length + 1}`);
      params.push(cursoId);
    }

    if (req.query.posted_by) {
      const postedBy = parseInt(req.query.posted_by);
      if (isNaN(postedBy))
        return res.status(400).json({
          success: false,
          msg: "Error posted_by must be a number",
        });

      whereConditions.push(`v.posted_by = $${params.length + 1}`);
      params.push(postedBy);
    }

    if (whereConditions.length > 0) {
      query += " WHERE " + whereConditions.join(" AND ");
    }
    const result = await pool.query(query, params);
    return res.status(200).json({
      success: true,
      vagas: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Error in query",
    });
  }
});

//insert vaga
app.post("/api/vagas", authenticateToken, async (req, res) => {
  if (req.user.userType === "copex") {
    const {
      titulo,
      descricao,
      cidade,
      cursoID,
      turno,
      bolsa = 0,
      tipo = "estágio",
      empresa_nome,
      contato,
      link,
      remunerado = false,
    } = req.body;
    try {
      if (
        !titulo ||
        !descricao ||
        !cidade ||
        !turno ||
        !empresa_nome ||
        !contato ||
        !cursoID
      ) {
        return res.status(400).json({
          success: false,
          msg: "Missing required body components",
        });
      }
      const query = `INSERT INTO vagas (titulo, descricao, cidade, turno, bolsa, tipo, empresa_nome, contato, posted_by, link, remunerado) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`;

      const result = await pool.query(query, [
        titulo,
        descricao,
        cidade,
        turno,
        bolsa,
        tipo,
        empresa_nome,
        contato,
        req.user.userId,
        link,
        remunerado,
      ]);

      const newVagaID = result.rows[0].id;

      await pool.query(
        "INSERT INTO vagas_cursos (vaga_id, curso_id) VALUES ($1, $2)",
        [newVagaID, cursoID]
      );
      return res.status(201).json({
        success: true,
        msg: "Sucessfully registered",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: "Server Error inserting into vagas",
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      msg: "Forbidden! Only copex can acess this route!",
    });
  }
});

//update vaga
app.put("/api/vagas/:id", authenticateToken, async (req, res) => {
  if (req.user.userType !== "copex")
    return res.status(403).json({
      success: false,
      msg: "Forbidden! Only copex can acess this route!",
    });

  const vagaId = parseInt(req.params.id);

  try {
    const {
      titulo,
      descricao,
      cidade,
      cursoId,
      turno,
      bolsa = 0,
      tipo = "estágio",
      empresa_nome,
      contato,
      link,
      remunerado = false,
    } = req.body;

    if (
      !titulo ||
      !descricao ||
      !cidade ||
      !turno ||
      !empresa_nome ||
      !contato ||
      !cursoId
    ) {
      return res.status(400).json({
        success: false,
        msg: "Missing required body components",
      });
    }

    const query = `
  UPDATE vagas SET titulo = $1, descricao = $2, cidade = $3, turno = $4, bolsa = $5, tipo = $6, empresa_nome = $7, contato = $8, link = $9, remunerado = $10 WHERE id = $11;
`;
    const result = await pool.query(query, [
      titulo,
      descricao,
      cidade,
      turno,
      bolsa,
      tipo,
      empresa_nome,
      contato,
      link,
      remunerado,
      vagaId,
    ]);

    await pool.query("DELETE FROM vagas_cursos WHERE vaga_id = $1;", [vagaId]);
    await pool.query(
      "INSERT INTO vagas_cursos (vaga_id, curso_id) VALUES ($1, $2);",
      [vagaId, cursoId]
    );

    return res.status(200).json({
      success: true,
      msg: "Sucessfully updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error updating vagas",
    });
  }
});

//delete vaga
app.delete("/api/vagas/:id", authenticateToken, async (req, res) => {
  if (req.user.userType !== "copex")
    return res.status(403).json({
      success: false,
      msg: "Forbidden! Only copex can acess this route!",
    });

  const vagaId = parseInt(req.params.id);
  if (isNaN(vagaId))
    return res.status(400).json({
      success: false,
      msg: "Invalid vaga id",
    });

  try {
    const result = await pool.query(
      "DELETE FROM vagas WHERE id = $1 RETURNING *",
      [vagaId]
    );
    if (result.rowCount === 0)
      return res.status(404).json({
        success: false,
        msg: `No vaga found with id ${vagaId}`,
      });

    return res.status(200).json({
      success: true,
      msg: `Vaga with id ${vagaId} deleted sucessfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error deleting vaga",
    });
  }
});

//gracefulll shut down
process.on("SIGINT", async () => {
  console.log("Shutting down safely...");
  await pool.end();
  process.exit(0);
});

app.listen(port, async () => {
  console.log(`Running on port ${port}`);
});
