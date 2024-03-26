import { Router } from "express";
import { findUserAllTodo } from '../db/index.js'
import {verifyToken} from '../jwt/index.js'



const TodoRoutes = Router()


TodoRoutes.post('/all', async (req, res) => {
    const { accessToken } = req.body;
    const {email} = verifyToken(accessToken)
    if(!email){
        res.send({
            code:403,
            message:"token is invalid"
        })
        return
    }
    const data = await findUserAllTodo(email);
    res.send({
        code:200,
        data
    })
})



export default TodoRoutes