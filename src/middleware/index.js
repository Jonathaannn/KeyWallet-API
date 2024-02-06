const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ Error: "Token inexistente!" });
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(498).json({ Error: "Token inválido!" });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = checkToken;
