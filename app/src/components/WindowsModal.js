import React from 'react';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';

import '../styles/css/WindowsModal.css';

const WindowsModal = ({show, handleClose}) => {   

   return (
      <div className='WindowsModal'>
         <Modal size="xl" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Tabla de información - Examen Clínico De Caries Dental</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Row className='mt-2'>
                  <Col xs={3}>

                     <Table className='table_leyenda COP-D' bordered>
                        <thead>
                           <tr>
                              <td colSpan={2} className="cabeceraTabla tituloTable">COP-D / ceo-D</td>
                           </tr>
                           <tr>
                              <td className="cabeceraTabla subtituloTable">Código</td>
                              <td className="cabeceraTabla subtituloTable">Definición</td>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>S</td>
                              <td>Sano</td>
                           </tr>
                           <tr>
                              <td>C</td>
                              <td>Cariado</td>
                           </tr>
                           <tr>
                              <td>O</td>
                              <td>Obturado</td>
                           </tr>
                           <tr>
                              <td>P <br /> e</td>
                              <td>Perdido por caries <br /> Extraído por caries</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Col>

                  <Col xs={4}>
                     <Table className='table_leyenda Con' bordered>
                        <thead>
                           <tr>
                              <td colSpan={2} className="cabeceraTabla tituloTable"><b>Con</b> - Condición de la superficie</td>
                           </tr>
                           <tr>
                              <td className="cabeceraTabla subtituloTable">Código</td>
                              <td className="cabeceraTabla subtituloTable">Definición</td>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>0</td>
                              <td>Sano</td>
                           </tr>
                           <tr>
                              <td>70</td>
                              <td>Sellante</td>
                           </tr>
                           <tr>
                              <td>80</td>
                              <td>Obturación: Resina / Amalgama / IdeV 4ario</td>
                           </tr>
                           <tr>
                              <td>97</td>
                              <td>Ausente / Perdido por otra causa</td>
                           </tr>
                        </tbody>
                     </Table>

                     <Table className='table_leyenda Con' bordered>
                        <thead>
                           <tr>
                              <td colSpan={2} className="cabeceraTabla tituloTable"><b>Con</b> - Condición del diente</td>
                           </tr>
                           <tr>
                              <td className="cabeceraTabla subtituloTable">Código</td>
                              <td className="cabeceraTabla subtituloTable">Definición</td>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>99</td>
                              <td>Diente sin erupcionar</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Col>

                  <Col xs={5}>
                     <Table className='table_leyenda Car' bordered>
                        <thead>
                           <tr>
                              <td colSpan={3} className="cabeceraTabla tituloTable"><b>Car</b> - Caries ICCMS a nivel de superficie simplificado</td>
                           </tr>
                           <tr>
                              <td rowSpan={2} className="cabeceraTabla subtituloTable">Definición</td>
                              <td colSpan={2} className="cabeceraTabla subtituloTable">Códigos con actividad</td>
                           </tr>
                           <tr>
                              <td className="cabeceraTabla subtituloTable">Inactivo</td>
                              <td className="cabeceraTabla subtituloTable">Activo</td>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>Sin cambios visuales</td>
                              <td colSpan={2}>0</td>
                           </tr>
                           <tr>
                              <td>Lesión inicial de caries: cambio visual en esmalte</td>
                              <td>20</td>
                              <td>21</td>
                           </tr>
                           <tr>
                              <td>Lesión moderada de caries</td>
                              <td>40</td>
                              <td>41</td>
                           </tr>
                           <tr>
                              <td>Lesión extensa o severa de caries</td>
                              <td>60</td>
                              <td>61</td>
                           </tr>
                           <tr>
                              <td>Perdido por caries</td>
                              <td colSpan={2}>96</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Col>
               </Row>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="outline-secondary" onClick={handleClose}>
                  Cerrar
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};

export default WindowsModal;