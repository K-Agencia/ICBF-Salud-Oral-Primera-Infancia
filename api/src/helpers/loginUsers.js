const { validarPassword } = require("../middleware/encrypt");
const { crearToken } = require("../middleware/token");

exports.validateDataUsers = (req, res, next) => {

   const { password, data } = req.body;

   if (data === undefined) {

      res.status(403).send("Correo electrónico Incorrecto");

   } else if (!validarPassword(password, data.passwordUsuarios)) {

      res.status(403).send("Contraseña Incorrecta");

   } else {

      let objToken = {
         id: data.idUsuarios,
         nombre: data.nombresUsuarios,
         apellido: data.apellidosUsuarios,
         institucion: data.institucionUsuarios,
         correo: data.emailsUsuarios,
         rol: data.rolUsuarios
      }

      res.status(200).json({
         token: crearToken(objToken),
         id: data.idUsuarios,
         nombre: data.nombresUsuarios,
         apellido: data.apellidosUsuarios,
      });
   }
}