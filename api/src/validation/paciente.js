const { check, body } = require('express-validator');
const { validateResult } = require('../helpers/validateResult');

const validatePaciente = [
   // body('tipoDocumento')
   //    .exists({ checkFalsy: true }).withMessage("El tipo de documento es un campo requerido").bail()
   //    .isLength({ min: 2, max: 2 }).withMessage("El tipo de documento no es válido").bail()
   //    .isIn(["RC", "TI", "PA", "CE"]).withMessage("Debe seleccionar un tipo de documento válido"),
   // body('noDocumento')
   //    .exists({ checkFalsy: true }).withMessage("El número de documento es un campo requerido").bail()
   //    .isNumeric().withMessage("El tipo de documento no es válido, solo se admiten números").bail()
   //    .isLength({ min: 9, max: 11 }).withMessage("El número de documento no es válido"),
   // body('nombre')
   //    .exists({ checkFalsy: true }).withMessage("El nombre del paciente es un campo requerido").bail()
   //    .isAlpha().withMessage("El nombre del paciente no es válido, solo se admiten letras").bail()
   //    .isLength({ max: 45 }).withMessage("El nombre del paciente supera el límite de 45 caracteres"),
   // body('apellido')
   //    .exists({ checkFalsy: true }).withMessage("El apellido del paciente es un campo requerido").bail()
   //    .isAlpha().withMessage("El apellido del paciente no es válido, solo se admiten letras").bail()
   //    .isLength({ max: 45 }).withMessage("El apellido del paciente supera el límite de 45 caracteres"),
   // body('fechaNacimiento')
   //    .exists({ checkFalsy: true }).withMessage("La fecha de nacimiento del paciente es un campo requerido").bail()
   //    .isDate().withMessage("La fecha de nacimiento del paciente no es válida, solo se admiten fechas 'YYYY/MM/DD'").bail()
   //    .isBefore().withMessage("La fecha de nacimiento del paciente debe ser anterior a hoy"),
   body('lugarNacimiento')
      .exists({ checkFalsy: true }).withMessage("El lugar de nacimiento del paciente es un campo requerido").bail()
      .isObject().withMessage("El tipo de dato 'lugar de nacimiento del paciente' no es valido").bail()
      .custom((value, { req }) => {
         if (!value.id) {
            if (!value.idDepartamento && !value.nombreMunicipio) {
               throw new Error('La estructura de datos no es la correcta')
            }
         }
         return true;
      }),
   body('lugarNacimiento.id')
      .exists({ checkFalsy: true }).withMessage("El lugar de nacimiento del paciente es un campo requerido")
      .isNumeric().withMessage("El id del lugar de nacimiento del paciente no es válido, solo se admiten números").bail()
      .isLength({ max: 11 }).withMessage("El id del lugar de nacimiento del paciente supera el límite de 11 caracteres").bail(),
   body('lugarNacimiento.idDepartamento')
      .exists({ checkFalsy: true }).withMessage("El id del departamento de nacimiento del paciente es un campo requerido")
      .isNumeric().withMessage("El id del departamento de nacimiento del paciente no es válido, solo se admiten números").bail()
      .custom((value, { req }) => {
         if (value > 33) {
            throw new Error("El id del departamento de nacimiento del paciente no es válido")
         }
      }),
   body('lugarNacimiento.nombreMunicipio')
      .exists({ checkFalsy: true }).withMessage("El nombre del municipio de nacimiento del paciente es un campo requerido")
      .isAlpha().withMessage("El nombre del municipio de nacimiento del paciente no es válido, solo se admiten letras").bail()
      .isLength({ max: 80 }).withMessage("El nombre del municipio de nacimiento del paciente supera el límite de 80 caracteres"),
   // check('lugarNacimiento')
   //    .exists({ checkFalsy: true }).withMessage("El lugar de nacimiento del paciente es un campo requerido").bail()
   //    .custom((value, { req }) => {
   //       if (value.id) {
   //          [
   //             check('lugarNacimiento.id')
   //                .isNumeric().withMessage("El id del lugar de nacimiento del paciente no es válido, solo se admiten números").bail()
   //                .isLength({ max: 11 }).withMessage("El id del lugar de nacimiento del paciente supera el límite de 11 caracteres").bail(),
   //          ]
   //       } else {
   //          [
   //             check('lugarNacimiento.idDepartamento')
   //                .exists({ checkFalsy: true }).withMessage("El id del departamento de nacimiento del paciente es un campo requerido").bail()
   //                .isNumeric().withMessage("El id del departamento de nacimiento del paciente no es válido, solo se admiten números").bail()
   //                .custom((value, { req }) => {
   //                   if (value > 33) {
   //                      throw new Error("El id del departamento de nacimiento del paciente no es válido")
   //                   }
   //                }),
   //             check('lugarNacimiento.nombreMunicipio')
   //                .exists({ checkFalsy: true }).withMessage("El nombre del municipio de nacimiento del paciente es un campo requerido").bail()
   //                .isAlpha().withMessage("El nombre del municipio de nacimiento del paciente no es válido, solo se admiten letras").bail()
   //                .isLength({ max: 80 }).withMessage("El nombre del municipio de nacimiento del paciente supera el límite de 80 caracteres"),
   //          ]
   //       }
   //    }),
   // body('direccionResidencial')
   //    .exists({ checkFalsy: true }).withMessage("La dirección residencial del paciente es un campo requerido").bail()
   //    .isLength({ max: 45 }).withMessage("La dirección residencial del paciente supera el límite de 45 caracteres"),
   // body('barrioResidencial')
   //    .exists({ checkFalsy: true }).withMessage("El barrio de residencia del paciente es un campo requerido").bail()
   //    .isLength({ max: 45 }).withMessage("El barrio de residencia del paciente supera el límite de 45 caracteres"),
   // body('direccionResidencial')
   //    .exists({ checkFalsy: true }).withMessage("La dirección residencial del paciente es un campo requerido").bail()
   //    .isLength({ max: 45 }).withMessage("La dirección residencial del paciente supera el límite de 45 caracteres"),
   // check('direccionResidencial').notEmpty(),
   // check('barrioResidencial').notEmpty(),
   // check('municipioResidencial').notEmpty(),
   // check('eps').notEmpty(),
   // check('acudiente').notEmpty(),
   // check('escuela').notEmpty(),
   // check('usuario').notEmpty(),
   (req, res, next) => {
      validateResult(req, res, next);
   }
].filter(x => !!x)

module.exports = {
   validatePaciente
}

// 'id_paciente', 'int(11)', 'NO', 'PRI', NULL, 'auto_increment'
// 'tipo_Documento', 'varchar(3)', 'NO', '', NULL, ''
// 'no_Documento', 'varchar(11)', 'NO', '', NULL, ''
// 'nombre', 'varchar(45)', 'NO', '', NULL, ''
// 'apellido', 'varchar(45)', 'NO', '', NULL, ''
// 'fecha_nacimiento', 'date', 'NO', '', NULL, ''
// 'id_municipio_nacimiento', 'int(11)', 'NO', 'MUL', NULL, ''
// 'direccion_residencial', 'varchar(60)', 'NO', '', NULL, ''
// 'barrio_residencial', 'varchar(45)', 'NO', '', NULL, ''
// 'id_municipio_residencial', 'int(11)', 'NO', 'MUL', NULL, ''
// 'id_eps', 'int(11)', 'NO', 'MUL', NULL, ''
// 'id_acudiente', 'int(11)', 'NO', 'MUL', NULL, ''
// 'id_escuela', 'int(11)', 'NO', 'MUL', NULL, ''
// 'id_usuario', 'int(11)', 'NO', 'MUL', NULL, ''
// 'fechaHoraInsercion_Registro', 'timestamp', 'NO', '', 'CURRENT_TIMESTAMP', ''
