const pool = require('../config/conexion.js');
const { buildSQL } = require('../helpers/buildSQL.js');

exports.get_loginUsers = (req, res, next) => {

   const { correo } = req.body;

   const query = 'SELECT * FROM usuarios WHERE emailsUsuarios=?;'

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [correo], (err, results, fields) => {
         if (err) throw err;

         req.body.data = results[0];

         connection.release();
         next();
      })
   });
}

exports.get_listaPacientes = (req, res, next) => {

   const { idUsuario } = req.body;

   const query = 'SELECT id, tipoNoDocumentoPaciente, noDocumentos, nombres, apellidos, escuelas FROM lista_pacientes WHERE usuario=?;';

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [idUsuario], (err, results, fields) => {
         res.send(results);

         connection.release();
         if (err) throw err;
      });
   });
}

exports.get_historiaClinica = (req, res, next) => {

   const { id } = req.query;
   const { idUsuario } = req.body;

   pool.getConnection(async (err, connection) => {
      if (err) throw err;

      // const informacionPersonal = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM lista_pacientes WHERE id = ? AND usuario = ?;';

      //    connection.query(query, [id, idUsuario], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // const consentimiento = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM consentimientos WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })


      // const antecedentes = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM antecedentes WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // const evaluacionSaludBucal = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM evaluacion_salud_bucal WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // const placaBacteriana = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM registros_placaBacteriana WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // const caries = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM registros_caries WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // const evaluacionRiesgoCaries = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM evaluacion_riego_caries WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // const carnetFluorizacion = await new Promise((resolve) => {

      //    const query = 'SELECT * FROM carnet_fluorizacion WHERE id_paciente=?;';

      //    connection.query(query, [informacionPersonal.id], (err, results, fields) => {
      //       if (err) throw err;
      //       resolve(results[0]);
      //    });
      // })

      // res.json({
      //    informacionPersonal,
      //    consentimiento,
      //    antecedentes,
      //    evaluacionSaludBucal,
      //    placaBacteriana,
      //    caries,
      //    evaluacionRiesgoCaries,
      //    carnetFluorizacion
      // })

      const query = 'SELECT * FROM historias_clinicas WHERE id = ? AND usuario = ?;';

      connection.query(query, [id, idUsuario], (err, results, fields) => {
         res.send(results);

         connection.release();
         if (err) throw err;
      });


   });
}

exports.get_departamentos = (req, res, next) => {

   const query = 'SELECT * FROM departamentos;';

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, (err, results, fields) => {
         res.send(results);

         connection.release();
         if (err) throw err;
      });
   });
}

exports.get_municipios = (req, res, next) => {

   const { id } = req.query;

   const query = 'SELECT id_municipios, municipios FROM municipios WHERE id_departamentos = ? ORDER BY municipios ASC;';

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [id], (err, results, fields) => {
         res.send(results);

         connection.release();
         if (err) throw err;
      });
   });
}

exports.get_eps = (req, res, next) => {

   const { id } = req.query;

   const query = 'SELECT id_eps, eps FROM eps WHERE id_eps < 45 ORDER BY eps ASC;';

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [id], (err, results, fields) => {
         res.send(results);

         connection.release();
         if (err) throw err;
      });
   });
}

exports.get_idInfoAcudiente = (req, res, next) => {

   const { cedulaAcudiente } = req.body;

   if (cedulaAcudiente.trim().length > 0) {

      pool.getConnection(async (err, connection) => {
         if (err) throw err;
         const select = 'SELECT * FROM acudientes WHERE noDocumento_acudientes = ?';

         connection.query(select, [
            cedulaAcudiente
         ], (err, results, fields) => {

            if (err) throw err;
            res.status(200).send(results[0]);
            connection.release();
            next();
         })
      });
   } else {
      res.status(400).send("Debes llenar este campo");
   }
}

exports.post_registrarseUsers = (req, res, next) => {

   const {
      nombre,
      apellido,
      institucion,
      correo,
      pass
   } = req.body;

   const queryValidacion = "SELECT count(*) AS usuarios FROM usuarios where emailsUsuarios=?;";
   const query = "INSERT INTO usuarios VALUES (NULL, ?, ?, ?, ?, ?, 'user', NULL);";

   pool.getConnection(async (err, connection) => {
      if (err) throw err;

      const countUsuarios = await new Promise((resolve) => {
         connection.query(queryValidacion, [correo], (err, results, fields) => {
            if (err) throw err;
            resolve(results[0].usuarios);
         });
      })

      if (countUsuarios === 0) {
         connection.query(query, [
            nombre.toLowerCase(),
            apellido.toLowerCase(),
            institucion.toLowerCase(),
            correo.toLowerCase(),
            pass,
         ], (err, results, fields) => {

            if (err) throw err;
            res.status(200).send("El usuario se ha añadido exitosamente");
            connection.release();
         });
      } else {
         res.status(409).send("El usuario ya existe en nuesta base de datos");
      }

   });

}

exports.post_registroPaciente = (req, res, next) => {

   const {
      paciente,
      escuela,
      acudiente,
      idUsuario,
   } = req.body

   pool.getConnection(async (err, connection) => {

      const get_idEps = await new Promise((resolve) => {

         if (paciente.eps.id == 0) {
            const insert = 'INSERT INTO eps (eps, regimen) VALUES (?,?);';

            connection.query(insert, [
               paciente.eps.nombre,
               paciente.eps.regimen
            ], (err, results, fields) => {

               if (err) throw err;
               resolve(results.insertId);
            })
         } else {
            resolve(paciente.eps.id);
         }
      })

      const get_idEscuelas = await new Promise((resolve) => {

         const insert = 'INSERT INTO escuelas VALUES (NULL, ?, ?, NULL)';

         connection.query(insert, [
            escuela.municipio,
            escuela.nombre,
         ], (err, results, fields) => {

            if (err) throw err;
            resolve(results.insertId);
         })
      })

      const get_idAcudiente = await new Promise((resolve) => {

         const insert = 'INSERT INTO acudientes VALUES (NULL, ?, ?, ?, ?, ?, ?, NULL)';

         connection.query(insert, [
            acudiente.identificacion.tipo,
            acudiente.identificacion.numero,
            acudiente.nombre,
            acudiente.apellido,
            acudiente.telefono,
            acudiente.parentesco
         ], (err, results, fields) => {
            if (err) throw err;

            resolve(results.insertId);
         })
      })

      const insert = 'INSERT INTO pacientes  VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL);';

      connection.query(insert, [
         paciente.identificacion.tipo,
         paciente.identificacion.numero,
         paciente.nombre,
         paciente.apellido,
         paciente.nacimiento.fecha,
         paciente.nacimiento.municipio,
         paciente.residencia.direccion,
         paciente.residencia.barrio,
         paciente.residencia.municipio,
         get_idEps,
         get_idAcudiente,
         get_idEscuelas,
         idUsuario
      ], (err, results, fields) => {
         if (err) throw err;

         res.status(200).json({
            id_paciente: results.insertId,
            message: "El paciente se añadió correctamente"
         })
         connection.release();
      })

   });
}

exports.post_consentimiento = (req, res, next) => {

   const data = JSON.parse(req.body.data);

   const { idPaciente } = data;
   const { filename } = req.file;

   const query = 'INSERT INTO consentimientos VALUES (NULL, ?, ?, NULL);';

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [
         idPaciente,
         filename
      ], (err, results, fields) => {

         res.send('El consentimiento informado se a añadido correctamente')

         connection.release();
         if (err) throw err;
      })
   })
}

exports.post_antecedentes = (req, res, next) => {

   let motivos = ["Valoración", "Aplicación Flúor", "Limpieza", "Calzar Dientes", "Retirar nervio del diente", "Sacar un diente o muela", "Urgencia (dolor, absceso...)"];

   const data = JSON.parse(req.body.data);

   const {
      idPaciente,
      ultimaConsulta,
      control,
      embarazo,
      parto,
      enfermedad,
      hospitalizacion,
      medicamentos,
      cirugia,
      cuidadoEspecial,
      visitaOdontologo,
      experiencias
   } = data;

   const { filename } = req.file;

   const query = `INSERT INTO antecedentes VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL);`;
   const query_visitaOdontologo = `INSERT INTO registros_visitaOdontologo (id_antecedentes, id_visitaOdontologo) VALUES (?, ?);`;
   const query_registro_vo_urgencia = "INSERT INTO registro_vo_urgencia (id_registros_visitaOdontologo, motivo_urgencia) VALUES (?, ?);";

   pool.getConnection(async (err, connection) => {

      if (err) throw err;

      const id_antecedentes = await new Promise((resolve) => {
         connection.query(query, [
            idPaciente,
            ultimaConsulta.tiempo,
            ultimaConsulta.motivo,
            ultimaConsulta.otro,
            control.fecha,
            control.talla,
            control.peso,
            embarazo.opcion,
            embarazo.motivo,
            parto,
            enfermedad.opcion,
            enfermedad.motivo,
            hospitalizacion.opcion,
            hospitalizacion.tiempo,
            hospitalizacion.motivo,
            medicamentos.opcion,
            medicamentos.motivo,
            cirugia.opcion,
            cirugia.motivo,
            cirugia.tiempo,
            cuidadoEspecial.opcion,
            cuidadoEspecial.motivo,
            visitaOdontologo.opcion,
            visitaOdontologo.tiempo,
            experiencias,
            filename
         ],
            (err, results, fields) => {
               if (err) throw err;
               resolve(results.insertId);
            }
         );
      })

      const final = await new Promise((resolve) => {

         const motivo = visitaOdontologo.motivo;

         for (let i = 0; i < motivo.length; i++) {

            let index = motivos.findIndex(e => e === motivo[i]) + 1;

            console.log(motivo[i], index);

            connection.query(query_visitaOdontologo, [
               id_antecedentes,
               index,
            ],
               (err, results, fields) => {
                  if (err) throw err;


                  if (motivo[i] === "Urgencia (dolor, absceso...)") {

                     connection.query(query_registro_vo_urgencia, [
                        results.insertId,
                        visitaOdontologo.urgencia.motivo
                     ], (err, res, fields) => {
                        if (err) throw err;
                     })
                  }

                  if ((i + 1) === motivo.length) {
                     resolve(true);
                  }
               }
            );
         }
      })

      if (final === true) {
         connection.release();
         res.send("Los antecedentes del paciente se han añadido correctamente");
      }

   })

}

exports.post_evaluacionSaludBucal = (req, res, next) => {

   const {
      idPaciente,
      extra_oral,
      intra_oral,
      observaciones,
      clasificar,
      observacionesDocente
   } = req.body;

   const query = `INSERT INTO evaluacion_salud_bucal VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL);`;

   pool.getConnection((err, connection) => {

      if (err) throw err;

      connection.query(query, [
         idPaciente,
         extra_oral.asimetria.observacion,
         extra_oral.rubor.observacion,
         extra_oral.dolorEnCara.observacion,
         extra_oral.otro,
         intra_oral.tejidosBlandos.lengua.observacion,
         intra_oral.tejidosBlandos.carrillos.observacion,
         intra_oral.tejidosBlandos.pisoBoca.observacion,
         intra_oral.tejidosBlandos.otro,
         intra_oral.encias.fisuras.observacion,
         intra_oral.encias.tumefaccion.observacion,
         intra_oral.encias.gingivitis.observacion,
         intra_oral.encias.placaBactMadura.observacion,
         intra_oral.encias.placaBactInmadura.observacion,
         intra_oral.encias.calculos.observacion,
         intra_oral.tejidos_dentales.cambioColor.observacion,
         intra_oral.tejidos_dentales.fracturas.observacion,
         intra_oral.tejidos_dentales.movilidadPatologica.observacion,
         intra_oral.tejidos_dentales.extracion.observacion,
         intra_oral.tejidos_dentales.lecionesManchas.observacion,
         intra_oral.tejidos_dentales.microcavidades.observacion,
         intra_oral.tejidos_dentales.cavidadesDetectables.observacion,
         intra_oral.tejidos_dentales.obtCompatibles.observacion,
         intra_oral.tejidos_dentales.obtRetentivas.observacion,
         intra_oral.tejidos_dentales.obtDefectuosas.observacion,
         intra_oral.tejidos_dentales.alteraciones.observacion,
         intra_oral.tejidos_dentales.defectosEsmalte.observacion,
         intra_oral.tejidos_dentales.alteracionesEsqueleticas.observacion,
         intra_oral.tejidos_dentales.maloclusion.observacion,
         observaciones,
         clasificar,
         observacionesDocente
      ],
         (err, results, fields) => {
            if (err) throw err;

            res.send("La evaluación de salud bucal del paciente se han añadido correctamente");

            connection.release();
         }
      );
   })
}

exports.post_placaBacteriana = (req, res, next) => {

   const {
      idPaciente,
      dientes,
      observacionesDocente
   } = req.body;

   pool.getConnection(async (err, connection) => {

      if (err) throw err;

      const id_placaBacteriana = await new Promise((resolve) => {

         const query = `INSERT INTO placa_bacteriana VALUES (NULL, ?, ?, NULL);`;
         connection.query(query, [
            idPaciente,
            observacionesDocente
         ],
            (err, results, fields) => {
               if (err) throw err;
               resolve(results.insertId);
            }
         );
      })

      const createSQL = buildSQL(dientes, id_placaBacteriana);

      const query_registros = `INSERT INTO registros_placa_bacteriana (id_placa_bacteriana, id_dientes, id_superficies, valor) VALUES ${createSQL}`;

      connection.query(query_registros,
         (err, results, fields) => {
            if (err) throw err;
            res.send("La evaluación de placa bacteriana del paciente se han añadido correctamente");
            connection.release();
         }
      );
   })
}

exports.post_caries = (req, res, next) => {

   const {
      idPaciente,
      dientes,
      observacionesDocente
   } = req.body;

   pool.getConnection(async (err, connection) => {

      if (err) throw err;

      const id_caries = await new Promise((resolve) => {

         const query = `INSERT INTO caries VALUES (NULL, ?, ?, NULL);`;
         connection.query(query, [
            idPaciente,
            observacionesDocente
         ],
            (err, results, fields) => {
               if (err) throw err;
               resolve(results.insertId);
            }
         );
      })

      const createSQL = buildSQL(dientes, id_caries);

      const query_registros = `INSERT INTO registros_caries (id_caries, id_dientes, id_superficies, id_tipos, valor) VALUES ${createSQL}`;

      connection.query(query_registros,
         (err, results, fields) => {
            if (err) throw err;
            res.send("La evaluación de caries dental del paciente se han añadido correctamente");
            connection.release();
         }
      );
   })
}

exports.post_evaluacion_riego_caries = (req, res, next) => {

   const {
      idPaciente,
      pufa,
      lesiones_activas,
      espejo_piso_Boca,
      lesiones_cavitacionales,
      placa_visible,
      riesgo_caries_dental,
      antecedentes_sistemicos,
      factores_retentivos_placa,
      otro
   } = req.body;

   const query = `INSERT INTO evaluacion_riego_caries VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL); `;

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [
         idPaciente,
         pufa.opcion,
         pufa.indice,
         lesiones_activas,
         espejo_piso_Boca,
         lesiones_cavitacionales,
         placa_visible,
         riesgo_caries_dental,
         antecedentes_sistemicos,
         factores_retentivos_placa,
         otro.opcion,
         otro.motivo
      ], (err, results, fields) => {
         if (err) throw err;

         res.send("La evaluación de riesgo de caries del paciente se han añadido correctamente");

         connection.release();
      })
   });
}

exports.post_carnet_fluorizacion = (req, res, next) => {

   const data = JSON.parse(req.body.data);

   const {
      idPaciente,
      entrega,
      fecha_entrega,
      receptor_carnet,
      contacto_receptor_carnet,
      actividades
   } = data;

   const { filename } = req.file;

   const query = `INSERT INTO carnet_fluorizacion VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL) `

   pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(query, [
         idPaciente,
         entrega,
         fecha_entrega,
         receptor_carnet,
         contacto_receptor_carnet,
         actividades.sesion_educativa,
         actividades.control_placa,
         actividades.educacion_salud_bucal,
         actividades.entrega_kit,
         actividades.cepillado_dental,
         actividades.valoracion_caries,
         actividades.valoracion_aiepi,
         actividades.aplicacion_barniz,
         actividades.entrega_remision,
         filename
      ], (err, results, fields) => {
         if (err) throw err;

         res.send("El carnet de fluorización del paciente se han añadido correctamente");

         connection.release();
      })
   });
}