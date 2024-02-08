exports.deleteNull = (req, res, next) => {

   const { results } = req

   for (const property in results) {
      if (results[property] === null) {
         delete results[property]
      }
   }

   res.send([results]);
}