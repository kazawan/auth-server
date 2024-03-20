import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./authRoutes/index.js";

//todo 测试用
import { verifyAccessTokenMiddleware } from "./jwt/index.js";
import fetchCounter from "./helper/debounes.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again after 10 seconds",
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//todo 测试用
app.post("/tokenTest", verifyAccessTokenMiddleware, (req, res) => {
  const body = req.body;
  res.send({
    code: 200,
    message: "token is valid",
    data: body,
  });
});

const counter = fetchCounter();
app.get("/counter", limiter, (req, res) => {
  res.send({
    code: 200,
    msg: "success",
  });
});

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
