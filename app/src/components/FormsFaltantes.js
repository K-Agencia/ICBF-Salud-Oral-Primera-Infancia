import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { RouterLinks } from '../constants/RouterLinks';

const FormsFaltantes = ({ con, ant, eb, pla, car, rcar, carnet }) => {

   const [nombres, setNombres] = useState([]);
   console.log(con);

   useEffect(() => {
      setNombres([
         { id: con, nombre: "Autorización por parte del padre de familia", link: RouterLinks.Consentimiento },
         { id: ant, nombre: "Antecedentes de salud general", link: RouterLinks.Antecedentes },
         { id: eb, nombre: "Evaluación de Salud Bucal: AIEPI", link: RouterLinks.EvaluacionSaludBucal },
         { id: pla, nombre: "Medición De Placa Bacteriana", link: RouterLinks.PlacaBacteriana },
         { id: car, nombre: "Examen Clínico De Caries Dental", link: RouterLinks.CariesDental },
         { id: rcar, nombre: "Evaluación de Riesgo de Caries Dental", link: RouterLinks.EvaluacionRiesgo },
         { id: carnet, nombre: "Carnet de Fluorización", link: RouterLinks.CarnetFluorizacion }
      ])
   }, []);

   return (
      <div className='FormsFaltantes'>
         <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
               <Accordion.Header>Formularios Faltantes</Accordion.Header>
               <Accordion.Body>
                  {nombres.map((nom, index) => {
                     if (nom.id === null) {
                        console.log(nom);
                        return (
                           <Row key={index}>
                              <Col>
                                 <Button onClick={() => window.location.href = nom.link} variant='warning'></Button>{nom.nombre}
                              </Col>
                           </Row>
                        )
                     }
                  })}
               </Accordion.Body>
            </Accordion.Item>
         </Accordion>
      </div>
   );
};

export default FormsFaltantes;