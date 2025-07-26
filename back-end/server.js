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
  max: 10, //max de conexões simultaneas
  min: 2, // minimo de conexões simultaneas
  connectionTimeoutMillis: 5000, // Timeout para conectar
  acquireTimeoutMillis: 60000, // Timeout para pegar conexão do pool
  statement_timeout: 30000, // Timeout para queries
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// +-- Routes ---+

//get users
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM users";
  pool.query(query, (error, result) => {
    if (error) return res.status(500).json({ 
      success: false,
      msg: `Error in query: ${error}` });
    return res.status(200).json(result.rows);
  });
});

//register new user
app.post("/api/users", async (req, res) => {
  const { email, password, name, user_type } = req.body;
  if (email && password && name && user_type) {
    if (!["aluno", "copex", "empresa"].includes(user_type))
      return res.status(404).json({ 
        success: false,
        msg: "Invalid user_type" });

    const query =
      "INSERT INTO users (email, password, name, user_type) VALUES ($1, $2, $3, $4)";
    const hash = await bcrypt.hash(password, 10);
    pool.query(query, [email, hash, name, user_type], (error, result) => {
      if (error) return res.status(500).json({ 
        success: false,
        msg: `Error in query: ${error}` });
      res.status(201).json({ 
        success: true,
        msg: `Sucessfully registered ${name}` });
    });
  } else {
    return res.status(404).json({ 
      success: false,
      msg: "missing body components" });
  }
});

// Validates if email is not in use
app.get('/api/users/check-email/:email', async (req, res) => {
  try {
    const email = req.params.email
    if(!email) return res.status(400).json({
      success: false,
      msg: `Invalid body components`
    })

    const result = await pool.query("SELECT COUNT(*) as count FROM users WHERE email = $1", [email])

    const exists = (parseInt(result.rows[0].count) > 0)

    return res.status(200).json({
      success: true,
      exists,
      msg: exists ? "Avaible email" : "Email already in use"
    })

  } catch (error) {
    console.log(`Error checking email: ${error}`)
    res.status(500).json({
      success: false,
      msg: `Error checking email: ${error}`
    })
  }
})

//user login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ 
        success: false,
        msg: `Missing body components` });
    const query = "SELECT * FROM users WHERE email = $1 LIMIT 1";
    const result = await pool.query(query, [email]);
    if (!result || result.rowCount === 0)
      return res.status(404).json({ 
        success: false,
        msg: `User not found` });
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "invalid credentials" });

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
app.post('/api/users/logout', authenticateToken, (req, res) => {
  res.clearCookie("authToken")
  res.status(200).json({
    success: true,
    msg: 'Sucessfully logged out'
  })
})

app.listen(port, async () => {
  console.log(`Running on port ${port}`);
});
