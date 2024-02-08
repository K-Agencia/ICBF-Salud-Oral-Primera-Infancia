exports.buildSQL = (arrDientes, id) => {

   const num_dientes = [16, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 26, 46, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, 36];
   const num_superficies = ["V", "L", "M", "D", "O", "P"];
   const num_tipo = ["con", "car"];

   let querySQL = "";

   for (const property in arrDientes) {

      const superficies = arrDientes[property];
      const id_diente = filterArr(num_dientes, parseInt(property.split('_')[1]));

      for (const item in superficies) {

         const id_superficie = filterArr(num_superficies, item);

         if (superficies[item].hasOwnProperty('con') || superficies[item].hasOwnProperty('car')) {

            const condiciones = superficies[item];

            for (const tipo in condiciones) {
               const id_tipo = filterArr(num_tipo, tipo);
               querySQL += `(${id},${id_diente},${id_superficie},${id_tipo},${condiciones[tipo] === '' ? null : condiciones[tipo]}),`;
            }
         } else {
            querySQL += `(${id},${id_diente},${id_superficie},${superficies[item] === '' ? -1 : superficies[item]}),`;
         }
      }
   }

   return querySQL.slice(0, -1) + ";";
}

const filterArr = (arr, id) => {
   return arr.findIndex(e => e == id) + 1;
}