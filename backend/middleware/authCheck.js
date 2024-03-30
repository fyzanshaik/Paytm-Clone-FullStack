const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  // console.log(" AUTH HIT")
  const authHeader = req.headers.authorization;
  // console.log(req.headers)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ userName: decoded.userId });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Authorization failed:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
