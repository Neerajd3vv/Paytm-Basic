const jwt = require("jsonwebtoken");
const { jwt_SECRET } = require("./config");

async function authMiddleware(req, res, next) {
  const fullToken = req.headers.authorization;
  if (!fullToken || !fullToken.startsWith("bearer")) {
    res.status(403).json({ msg: "invalid token" });
  }
  const realToken = fullToken.split(" ")[1];
  try {
    const decode = jwt.verify(realToken, jwt_SECRET);
    if (!decode.userId) {
      res.json({ msg: "no userId" });
    } else {
      req.userId = decode.userId;
      next()
    }
  } catch (err) {
    res
      .status(403)
      .json({ msg: "Abe tu hai kon? bkl, Token sahi nhi hai tera" });
  }
}

module.exports = authMiddleware;
