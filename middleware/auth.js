const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(400).json({ msg: "Bearer token missing" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    return next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

function admin(req, res, next) {
  if (!req.user)
    return res.status(401).json({ msg: "Unauthorized: No user data" });

  if (req.user.role === "admin") 
      return next();

  return res.status(403).json({ msg: "Admin access required" });
}
module.exports = { auth, admin };
