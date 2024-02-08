/**
El siguiente código es un servidor web construido con Node.js usando el framework Express,
que utiliza los middlewares de Morgan, Cors y errorHandling para manejar las solicitudes y respuestas HTTP.
Además, se utiliza el paquete sesionUsers, getData e insertData para manejar las rutas de la aplicación.
@module server
*/

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sesionUsers = require('./src/routers/sesionUsers.js');
const getData = require('./src/routers/getData.js');
const insertData = require('./src/routers/insertData.js');
const errorHandling = require('./src/middleware/errorHandling.js');

/**
El puerto en el que se ejecuta el servidor.
@const {number}
*/
const PORT = 3132;
/**
Una instancia de la aplicación de Express.
@const {Object}
*/
const app = express();
/**
Middleware que habilita el acceso CORS para la aplicación.
*/
app.use(cors());
/**
Middleware que registra las solicitudes HTTP en la consola con el formato dev.
*/
app.use(morgan('dev'));
/**
Middleware que procesa los datos de los formularios HTML.
*/
app.use(express.urlencoded({
   extended: false
}));
/**
Middleware que procesa los datos JSON enviados en las solicitudes HTTP.
*/
app.use(express.json());
/**
Middleware que maneja las solicitudes HTTP de la ruta '/sesionUsers'.
*/
app.use(sesionUsers);
/**
Middleware que maneja las solicitudes HTTP de la ruta '/getData'.
*/
app.use(getData);
/**
Middleware que maneja las solicitudes HTTP de la ruta '/insertData'.
*/
app.use(insertData);
/**
Middleware que maneja los errores de la aplicación.
*/
app.use(errorHandling);
/**
Inicia el servidor en el puerto especificado y registra un mensaje en la consola cuando el servidor se inicia.
*/
app.listen(PORT, () => {
   console.log(`Servidor en puerto ${PORT}`);
});