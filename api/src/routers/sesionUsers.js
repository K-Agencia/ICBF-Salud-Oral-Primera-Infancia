const express = require('express');

const { get_loginUsers, post_registrarseUsers } = require('../middleware/database.js');
const { validateDataUsers } = require('../helpers/loginUsers.js');
const { encriptarPw } = require('../helpers/encriptarPW.js');
const { getDataAuth } = require('../helpers/getDataAuth.js');

const app = express();

app.get('/login', getDataAuth, get_loginUsers, validateDataUsers);
app.post('/registrarse', encriptarPw, post_registrarseUsers);

module.exports = app;