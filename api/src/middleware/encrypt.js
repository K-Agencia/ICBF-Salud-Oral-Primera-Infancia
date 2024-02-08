const bcrypt = require('bcryptjs');

const encriptarPassword = (pass) => {
   return bcrypt.hashSync(pass, 10);
}

const validarPassword = (passwordUser, passwordDatabase) => {
   return bcrypt.compareSync(passwordUser, passwordDatabase);
}

module.exports = {
   encriptarPassword,
   validarPassword
}