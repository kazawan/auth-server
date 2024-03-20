import jwt from "jsonwebtoken";
let JWT_SECRET = "secret";

function generateToken(payload, expiresIn) {
  return jwt.sign({ ...payload }, JWT_SECRET, {
    expiresIn: expiresIn, // in seconds
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function verifyAccessTokenMiddleware(req, res, next) {
  const { accessToken } = req.body;
  if (token == null) return res.sendStatus(401);
  if (verifyToken(token)) {
    next();
  } else {
    res.sendStatus(403).send({
      code: 403,
      message: "token is invalid",
    });
  }
}

export {
  jwt,
  JWT_SECRET,
  generateToken,
  verifyToken,
  verifyAccessTokenMiddleware,
};
