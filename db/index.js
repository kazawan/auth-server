import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function UserExistMiddleWire(req, res, next) {
    const {email} = req.body;

    const data = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(data){
        res.status(400).send("User already exist");
    
    }else{
        next();
    
    }
}


/**
 * 
 * @param {string} email 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function CreateUser(email, username, password) {
    const res = await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: password
        }
    })
    return res;
}








export {

    CreateUser,
    UserExistMiddleWire
}