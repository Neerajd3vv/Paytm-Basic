const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const fullToken = req.headers.authorization;

  if (!fullToken || !fullToken.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const realToken = fullToken.split(" ")[1];

  try {
    const decoded = jwt.verify(realToken, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = authMiddleware;
