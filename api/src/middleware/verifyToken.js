const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_KEY = process.env.JWT_KEY || "juan";

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ")[1];

  if (!token) {
    res.status(403).json({ msg: "NOT AUTHENTICATED!" });
    return;
  }
  console.log("Token: ", token);
  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      res.status(401).json("INVALID TOKEN!");
      return;
    }
    console.log("[Token Value]:", user);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
