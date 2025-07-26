import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token)
    return res.status(401).json({
      success: false,
      error: "Acess token required",
    });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(`Autentication error: ${error}`);
    res.status(403).json({
      success: false,
      error: error,
    });
  }
}
