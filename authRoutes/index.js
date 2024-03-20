import { Router } from "express";
import { Password_Encrypted, Password_Compare } from '../bcrypt/index.js'
import { generateToken, verifyToken } from '../jwt/index.js'
import { CreateUser, UserExistMiddleWire } from '../db/index.js'
import { emailValidator } from "../helper/helper.js";
const router = Router();

router.get("/login", (req, res) => {
    res.send("Login");
});

router.post("/register",
    UserExistMiddleWire,
    emailValidator,
    async (req, res) => {
        const { username, password, email } = req.body;
        const hash = Password_Encrypted(password);
        try {
            await CreateUser(email, username, hash);

        } catch (err) {
            res.status(400).send("db error");
        }
        res.send({
            code: 200,
            message: "User created successfully",
        });
    }
);

export default router;