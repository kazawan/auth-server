import fs from "fs";

// fs.writeFileSync("tokenBlackList.txt", "");

const TOKEN_BLACK_LIST = fs
  .readFileSync("tokenBlackList.txt", "utf8")
  .split("\n");

const ignoreToken = (token) => {
  TOKEN_BLACK_LIST.push(token);
  fs.appendFileSync("tokenBlackList.txt", token + "\n");
};

const isTokenIgnore = (token) => {
  return TOKEN_BLACK_LIST.includes(token);
};

const accessTokenCheckMiddleware = async (req, res, next) => {
  const { accessToken } = req.body;
  if (isTokenIgnore(accessToken)) {
    res.status(400).send("token is ignore");
  } else {
    next();
  }
};

const refreshTokenCheckMiddleware = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (isTokenIgnore(refreshToken)) {
    res.status(400).send("token is ignore");
  } else {
    next();
  }
};

export { ignoreToken, isTokenIgnore, TOKEN_BLACK_LIST };
