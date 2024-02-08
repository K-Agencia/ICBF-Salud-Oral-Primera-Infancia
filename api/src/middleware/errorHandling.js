const errorHandling = (err, req, res, next) => {
   console.error(`ERROR! ${err.message}`);
   res.status(500).send('¡Ups! Tuvimos un problema interno, inténtalo más tarde');
}

module.exports = errorHandling;