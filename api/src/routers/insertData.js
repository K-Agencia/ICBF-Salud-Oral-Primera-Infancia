/**

Objeto que crea una aplicación Express.
@constant
@type {Object}
*/
const express = require('express');

/**

Middleware que permite subir archivos al servidor.
@constant
@type {Function}
*/
const fileUpload = require('../middleware/fileUpload.js');

/**

Middleware que verifica el token de autenticación del usuario.
@constant
@type {Function}
*/
const { verificarToken } = require('../middleware/token.js');

/**

Middleware que verifica el rol de autenticación del usuario.
@constant
@type {Function}
*/
const varificarRol = require('../middleware/checkRolAuth.js');

/**

Middleware que se encarga de realizar operaciones de la base de datos relacionadas con la información del paciente.
@constant
@type {Object}
*/
const {
   post_registroPaciente,
   post_consentimiento,
   post_antecedentes,
   post_evaluacionSaludBucal,
   post_placaBacteriana,
   post_caries,
   post_evaluacion_riego_caries,
   post_carnet_fluorizacion
} = require('../middleware/database.js');

/**

Objeto que crea una aplicación Express.
@constant
@type {Object}
*/
const app = express();

// ------------------------------ INFORMACIÓN PERSONAL DEL NIÑO ------------------------------

app.post('/insertarPaciente', verificarToken, varificarRol(['user']), post_registroPaciente);
app.post("/consentimiento", verificarToken, varificarRol(['user']), fileUpload, post_consentimiento);
app.post('/antecedentes', fileUpload, post_antecedentes);
app.post('/evaluacionSaludBucal', verificarToken, varificarRol(['user']), post_evaluacionSaludBucal);
app.post('/placaBacteriana', verificarToken, varificarRol(['user']), post_placaBacteriana);
app.post('/caries', verificarToken, varificarRol(['user']), post_caries);
app.post('/evaluacionRiesgoCaries', verificarToken, varificarRol(['user']), post_evaluacion_riego_caries);
app.post("/carnetFluorizacion", verificarToken, varificarRol(['user']), fileUpload, post_carnet_fluorizacion);

module.exports = app;