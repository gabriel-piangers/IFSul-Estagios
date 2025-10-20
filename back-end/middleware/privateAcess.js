export function privateAcess(req, res, next) {
  const apiKey = req.headers["api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ success: false, msg: "Acesso negado" });
  }
  next();
}
