import bcrypt from "bcryptjs";
// require("dotenv").config({ path: "./.env" });


const salt = bcrypt.genSaltSync(10);

const Password_Encrypted = (password) => {
    return bcrypt.hashSync(password, salt);
}

const Password_Compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}



export  {
    Password_Encrypted,
    Password_Compare
}