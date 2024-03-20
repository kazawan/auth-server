import jwt from 'jsonwebtoken';
let JWT_SECRET = 'secret';


function generateToken(payload, expiresIn) {
    return jwt.sign({ ...payload }, JWT_SECRET, {
        expiresIn: expiresIn // in seconds
    });
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}











export  {
    jwt,
    JWT_SECRET,
    generateToken,
    verifyToken


}