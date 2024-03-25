import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//* 公共方法
async function findUser(email) {
  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return data;
}

async function findUserMiddleWire(req, res, next) {
  const { email } = req.body
  // console.log(email)
  try{
    const data = await findUser(email)
    if(data === null){
      res.send({
        code:404,
        message:"用户不存在"
      })
    }else{
      next()
    }
  }
  catch(err){
    console.log(err)
  }
}

async function UserExistMiddleWire(req, res, next) {
  const { email } = req.body;

  const data = await findUser(email);
  console.log(data)
  if (data) {
    res.send({
      code: 400,
      message: "User already exist",
    });
  } else {
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
      password: password,
      todos: {
        create: {
          title: `Hello ${username}!`,
          completed: true
        }


      }
    }
  });
  return res;
}


async function findUserAllTodo(email){
  try{
    const todo = await prisma.user.findUnique({
      where:{
        email:email
      },
      select:{
        todos:true
      }
    })
    return todo
  }
  catch(err){
    return false
  }
}



export { CreateUser, UserExistMiddleWire, findUser, findUserMiddleWire,findUserAllTodo };
