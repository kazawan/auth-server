function emailValidator(req, res, next) {
    const { email } = req.body;
   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? next() : res.send({code:400,message:"email error"});
}

function passwordValidator(req, res, next) {
    const { password } = req.body;
    password.length >= 6 ? next() : res.status(400).send("Password must be at least 6 characters");
}




export {
    emailValidator,
    passwordValidator
}