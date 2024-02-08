/**
Este código es un módulo que exporta una instancia de una aplicación de Express.
Contiene varias rutas que requieren autenticación y autorización para acceder a los datos de la base de datos.
@module sesionUsers
*/
const express = require('express');

// Importación de middlewares y funciones de ayuda.
const { verificarToken } = require('../middleware/token.js');
const varificarRol = require('../middleware/checkRolAuth.js');
const { get_listaPacientes, get_historiaClinica, get_departamentos, get_municipios, get_idInfoAcudiente, get_eps } = require('../middleware/database.js');
const { deleteNull } = require('../helpers/deleteNull.js');
const { validate } = require('../middleware/validate.js');

// Creación de una instancia de la aplicación de Express.
const app = express();


/**
Ruta que verifica el token de autenticación de un usuario.
@name get/validateToken
@function
@memberof module:sesionUsers
@param {Object} req - Objeto de solicitud HTTP.
@param {Object} res - Objeto de respuesta HTTP.
@param {function} next - Función middleware para pasar la solicitud al siguiente middleware.
*/
app.get('/validateToken', verificarToken, validate);

/**
Ruta que obtiene una lista de pacientes de la base de datos.
Requiere autenticación y autorización de usuario o administrador.
@name get/listaPacientes
@function
@memberof module:sesionUsers
@param {Object} req - Objeto de solicitud HTTP.
@param {Object} res - Objeto de respuesta HTTP.
@param {function} next - Función middleware para pasar la solicitud al siguiente middleware.
*/
app.get('/listaPacientes', verificarToken, varificarRol(['user', 'admin']), get_listaPacientes);

/**
Ruta que obtiene el historial clínico de un paciente de la base de datos.
Requiere autenticación y autorización de usuario o administrador.
@name get/historiasClinicas
@function
@memberof module:sesionUsers
@param {Object} req - Objeto de solicitud HTTP.
@param {Object} res - Objeto de respuesta HTTP.
@param {function} next - Función middleware para pasar la solicitud al siguiente middleware.
*/
app.get('/historiasClinicas', verificarToken, varificarRol(['user', 'admin']), get_historiaClinica);

/**
Ruta que obtiene una lista de departamentos de la base de datos.
Requiere autenticación y autorización de usuario o administrador.
@name get/departamentos
@function
@memberof module:sesionUsers
@param {Object} req - Objeto de solicitud HTTP.
@param {Object} res - Objeto de respuesta HTTP.
@param {function} next - Función middleware para pasar la solicitud al siguiente middleware.
*/
app.get('/departamentos', verificarToken, varificarRol(['user', 'admin']), get_departamentos);

/**
Función que maneja la solicitud GET en la ruta '/municipios' de la aplicación express.
@function
@name get_municipios
@param {Object} req - Objeto de solicitud http.
@param {Object} res - Objeto de respuesta http.
@param {Function} next - Función de middleware para pasar la solicitud al siguiente middleware.
@returns {Object} - Objeto de respuesta http con la lista de municipios obtenida desde la base de datos.
*/
app.get('/municipios', verificarToken, varificarRol(['user', 'admin']), get_municipios);

/**
Función que maneja la solicitud GET en la ruta '/eps' de la aplicación express.
@function
@name get_eps
@param {Object} req - Objeto de solicitud http.
@param {Object} res - Objeto de respuesta http.
@param {Function} next - Función de middleware para pasar la solicitud al siguiente middleware.
@returns {Object} - Objeto de respuesta http con la lista de EPS (Entidades Promotoras de Salud) obtenida desde la base de datos.
*/
app.get('/eps', verificarToken, varificarRol(['user', 'admin']), get_eps);

/**
Función que maneja la solicitud GET en la ruta '/acudiente' de la aplicación express.
@function
@name get_idInfoAcudiente
@param {Object} req - Objeto de solicitud http.
@param {Object} res - Objeto de respuesta http.
@param {Function} next - Función de middleware para pasar la solicitud al siguiente middleware.
@returns {Object} - Objeto de respuesta http con la información del acudiente obtenida desde la base de datos.
*/
app.get('/acudiente', verificarToken, varificarRol(['user', 'admin']), get_idInfoAcudiente);


module.exports = app;