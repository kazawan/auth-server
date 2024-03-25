import { Router } from "express";
import { Password_Encrypted, Password_Compare } from "../bcrypt/index.js";
import { generateToken, verifyToken } from "../jwt/index.js";
import { CreateUser, UserExistMiddleWire, findUser } from "../db/index.js";
import { emailValidator } from "../helper/helper.js";
import { isTokenIgnore, ignoreToken } from "../tokenBlackList/index.js";

const router = Router();

const ACCESSTOKEN_EXP_TIME = 1000 * 5;
const REFRESHTOKEN_EXP_TIME = 1000 * 12;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log('login',email,password)
  // 先找到对应的email 用户
  const data = await findUser(email);
  // 对比密码是否正确
  if (Password_Compare(password, data.password)) {
    // 生成 access token exp = 1h
    const accessToken = generateToken({ email, username: data.username }, ACCESSTOKEN_EXP_TIME);
    // 生成 refresh token exp = 7d
    const refreshToken = generateToken(
      { email, username: data.username },
      REFRESHTOKEN_EXP_TIME
    );
    res.send({
      code: 200,
      message: "login success",
      username:data.username,
      accessToken,
      accessTokenCreateAt: new Date().getTime(),
      accessTokenExp: ACCESSTOKEN_EXP_TIME,
      refreshToken,
      refreshTokenCreateAt: new Date().getTime(),
      refreshTokenExp: REFRESHTOKEN_EXP_TIME ,
    });
  } else {
    res.status(400).send("password error");
  }

  // 返回 access token 和 refresh token
});

router.post(
  "/register",
  UserExistMiddleWire,
  emailValidator,
  async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username, password, email);
    const hash = Password_Encrypted(password);
    try {
      await CreateUser(email, username, hash);
    } catch (err) {
      res.send({
        code: 400,
        message: "User already exist",
      });
    }
    res.send({
      code: 200,
      message: "User created successfully",
    });
  }
);

router.post("/logout", (req, res) => {
  const { accessToken, refreshToken } = req.body;
  ignoreToken(accessToken);
  ignoreToken(refreshToken);
  // 删除 refresh token
  console.log("登出", accessToken, refreshToken)
  res.send({
    code: 200,
    message: "logout success",
  });
});

router.post("/refreshToken", async (req, res) => {
  const { refreshToken } = req.body;
  
  if (isTokenIgnore(refreshToken)) {
    res.status(400).send("token is ignore");
  } else {
    const data = verifyToken(refreshToken);
    if (data) {
      const accessToken = generateToken(
        { email: data.email, username: data.username },
        "1h"
      );
      console.log('请求了新的accessToken',accessToken)
      res.send({
        code: 200,
        message: "refresh token success",
        accessToken,
        accessTokenExp: ACCESSTOKEN_EXP_TIME,
        accessTokenCreateAt: new Date().getTime(),
      });
    } else {
      res.status(400).send("token is invalid");
    }
  }
});

export default router;
