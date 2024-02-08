const { encriptarPassword } = require("../middleware/encrypt");

exports.encriptarPw = (req, res, next) => {

   const { password } = req.body;

   req.body.pass = encriptarPassword(password);
   next();
}