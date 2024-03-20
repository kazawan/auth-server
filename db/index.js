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

async function UserExistMiddleWire(req, res, next) {
  const { email } = req.body;

  const data = findUser(email);
  if (data) {
    res.status(400).send("User already exist");
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
    },
  });
  return res;
}

export { CreateUser, UserExistMiddleWire, findUser };
