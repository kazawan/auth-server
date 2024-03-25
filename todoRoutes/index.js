import { Router } from "express";
import { findUserAllTodo } from '../db/index.js'
const TodoRoutes = Router()


TodoRoutes.post('/all', async (req, res) => {
    const { email } = req.body;
    const data = await findUserAllTodo(email);
    res.send({
        code:200,
        data
    })
})



export default TodoRoutes