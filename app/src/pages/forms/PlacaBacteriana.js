import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit';
import IdentificacionPaciente from '../../components/IdentificacionPaciente';
import InputTextField from '../../components/InputTextField';
import LoadingSpinner from '../../components/LoadingSpinner';

import ObservacionDocente from '../../components/ObservacionDocente';
import TituloPaginas from '../../components/TituloPaginas';
import { ItemsPlacaBacteriana } from '../../constants/ItemsPlacaBacteriana';
import { RouterLinks } from '../../constants/RouterLinks';
import { useApi } from '../../hooks/useApi';

import '../../styles/css/PlacaBacteriana.css';

const initialForm = {
   method: 'post',
   url: '/placaBacteriana',
   dientes: {
      d_55: {
         V: "",
         L: "",
         M: "",
         D: "",
         O: ""
      },
      d_51: {
         V: "",
         L: "",
         M: "",
         D: ""
      },
      d_63: {
         V: "",
         L: "",
         M: "",
         D: ""
      },
      d_65: {
         V: "",
         L: "",
         M: "",
         D: "",
         O: ""
      },
      d_75: {
         V: "",
         L: "",
         M: "",
         D: "",
         O: ""
      },
      d_84: {
         V: "",
         L: "",
         M: "",
         D: "",
         O: ""
      },
      d_85: {
         V: "",
         L: "",
         M: "",
         D: "",
         O: ""
      }
   },
   observacionesDocente: ""
}

const cookies = new Cookies();

const PlacaBacteriana = () => {

   const { register, setValue, formState: { errors }, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const [data, setData] = useState({});

   const { loading, api_handleSubmit } = useApi();
   const [redirect, setRedirect] = useState(false);

   const [evaluacion, setEvaluacion] = useState(new Array(33).fill(''));
   const [mediana, setMediana] = useState(0);
   const [numSuperficies, setNumSuperficies] = useState(0);

   const [active, setActive] = useState(false);
   const handleClose = () => setActive(false);

   const onModal = (data) => {
      setData(data);
      setActive(true)
   }

   const onSubmit = async (data) => {

      data['idPaciente'] = localStorage.getItem('idPaciente');

      // console.log(data);
      handleClose();
      const res = await api_handleSubmit(data);

      if (res.status === 200) {
         cookies.set('menssage', res.data, { path: '/' });
         setRedirect(true);
      }
   }

   const onChange = (e) => {

      const evaluacion = [0, 1, 2, 3];
      const { name, value } = e.target;

      let valor = value;

      if (!evaluacion.includes(parseInt(value))) {
         valor = ''
      }

      setValue(name, valor);
   }


   const superficiesExaminadas = (value, index) => {
      let med = evaluacion;

      if (value !== "" || med[index] !== '') {
         med[index] = value;
      }

      setEvaluacion(med)
      evaluacionMediana(med)
   }

   const evaluacionMediana = (med) => {

      let arr = [];

      for (let i = 0; i < med.length; i++) {
         if (med[i] !== '') {
            arr.push(parseInt(med[i]));
         }
      }

      let numeros = arr.sort((x, y) => x - y);
      let mitad = Math.floor(numeros.length / 2);
      let mediana = 0;

      if (numeros.length % 2 === 1) {
         mediana = numeros[mitad];
      } else if (numeros.length === 2) {
         mediana = (parseInt(numeros[0]) + parseInt(numeros[1])) / 2
      } else {
         mediana = (parseInt(numeros[mitad]) + parseInt(numeros[mitad + 1])) / 2
      }

      setNumSuperficies(numeros.length);
      setMediana(mitad === 0 ? 0 : mediana);

   }

   useEffect(() => {

   }, []);

   return (
      <div className='PlacaBacteriana'>


         <Container>

            <IdentificacionPaciente />

            <TituloPaginas titulo="Medición De Placa Bacteriana" />

            <Accordion className='mb-3'>
               <Accordion.Item eventKey="0" >
                  <Accordion.Header><AiOutlineInfoCircle className='infoButton' />Guía de códigos y equivalencia</Accordion.Header>
                  <Accordion.Body>
                     <Table className='table_leyenda' bordered>
                        <thead>
                           <tr>
                              <td colSpan={2} className="cabeceraTable tituloTable">Criterios clínicos para el índice de placa bacteriana</td>
                           </tr>
                           <tr>
                              <td className="cabeceraTable subtituloTable">Grado</td>
                              <td className="cabeceraTable subtituloTable">Características</td>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='td_grado'>0</td>
                              <td>No hay placa</td>
                           </tr>
                           <tr>
                              <td className='td_grado'>1</td>
                              <td>No hay placa a simple vista. <br /> Hay placa cuando se realiza el pasaje de sonda por el área dentogingival.</td>
                           </tr>
                           <tr>
                              <td className='td_grado'>2</td>
                              <td>Hay placa bacteriana a simple vista</td>
                           </tr>
                           <tr>
                              <td className='td_grado'>3</td>
                              <td>Hay placa bacteriana a simple vista rodeando el diente, incluso por espacios interdentales. <br /> Puede haber cálculos</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion>

            <Form onSubmit={handleSubmit(onModal)}>
               <Card className='mb-3 center'>
                  <Row>
                     <Col xs={3} sm={2} className=''>
                        <Table bordered>
                           <thead>
                              <tr>
                                 <th>Diente</th>
                              </tr>
                              <tr>
                                 <th>Superficie</th>
                              </tr>
                              <tr>
                                 <th>Código</th>
                              </tr>
                           </thead>
                        </Table>
                     </Col>
                     <Col xs={8} sm={10} className=''>
                        <Table className='placa' bordered responsive>
                           <thead>
                              <tr>
                                 <th colSpan={5} className="color">55</th>
                                 <th colSpan={4}>51</th>
                                 <th colSpan={4} className="color">63</th>
                                 <th colSpan={5}>65</th>
                                 <th colSpan={5} className="color">75</th>
                                 <th colSpan={5}>84</th>
                                 <th colSpan={5} className="color">85</th>
                              </tr>
                              <tr>
                                 {/* 55 */}
                                 <th className="color">&nbsp;V&nbsp;</th>
                                 <th className="color">&nbsp;L&nbsp;</th>
                                 <th className="color">&nbsp;M&nbsp;</th>
                                 <th className="color">&nbsp;D&nbsp;</th>
                                 <th className="color">&nbsp;O&nbsp;</th>
                                 {/* 51 */}
                                 <th>&nbsp;V&nbsp;</th>
                                 <th>&nbsp;L&nbsp;</th>
                                 <th>&nbsp;M&nbsp;</th>
                                 <th>&nbsp;D&nbsp;</th>
                                 {/* 63 */}
                                 <th className="color">&nbsp;V&nbsp;</th>
                                 <th className="color">&nbsp;L&nbsp;</th>
                                 <th className="color">&nbsp;M&nbsp;</th>
                                 <th className="color">&nbsp;D&nbsp;</th>
                                 {/* 65 */}
                                 <th>&nbsp;V&nbsp;</th>
                                 <th>&nbsp;L&nbsp;</th>
                                 <th>&nbsp;M&nbsp;</th>
                                 <th>&nbsp;D&nbsp;</th>
                                 <th>&nbsp;O&nbsp;</th>
                                 {/* 75 */}
                                 <th className="color">&nbsp;V&nbsp;</th>
                                 <th className="color">&nbsp;L&nbsp;</th>
                                 <th className="color">&nbsp;M&nbsp;</th>
                                 <th className="color">&nbsp;D&nbsp;</th>
                                 <th className="color">&nbsp;O&nbsp;</th>
                                 {/* 84 */}
                                 <th>&nbsp;V&nbsp;</th>
                                 <th>&nbsp;L&nbsp;</th>
                                 <th>&nbsp;M&nbsp;</th>
                                 <th>&nbsp;D&nbsp;</th>
                                 <th>&nbsp;O&nbsp;</th>
                                 {/* 85 */}
                                 <th className="color">&nbsp;V&nbsp;</th>
                                 <th className="color">&nbsp;L&nbsp;</th>
                                 <th className="color">&nbsp;M&nbsp;</th>
                                 <th className="color">&nbsp;D&nbsp;</th>
                                 <th className="color">&nbsp;O&nbsp;</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr className='table'>
                                 {ItemsPlacaBacteriana.map((item, index) => (
                                    <td key={index}>
                                       <InputTextField
                                          {...register(`dientes.${item}`, {})} //required: true dientes 
                                          type="number" error={errors.correo} onChange={onChange} onBlur={(e) => superficiesExaminadas(e.target.value, index)} />
                                    </td>
                                 ))}
                              </tr>
                           </tbody>
                        </Table>
                     </Col>
                  </Row>
               </Card>
               <Card className='center'>
                  <Row>
                     <Col xs={12} sm={6} className=''>
                        <Card className='calculos'>
                           <Card.Body>
                              <b>Numero de superficies Examinadas: </b>
                              <h1>{numSuperficies}</h1>
                           </Card.Body>
                        </Card>
                     </Col>
                     <Col xs={12} sm={6} className=''>
                        <Card className='calculos'>
                           <Card.Body>
                              <b>Mediana: </b>
                              <h1>{mediana}</h1>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               </Card>

               <br />
               <Card className='Observaciones'>
                  <ObservacionDocente  {...register(`observacionesDocente`, {})} />
               </Card>

               <BottonSubmit disable={watch(`observacionesDocente`) === "" && true} />

               <Modal centered show={active} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>¡Advertencia!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     Una vez usted oprima el botón de <b>Guardar</b>, la información que usted suministró no podrá ser editada después. <br />
                     Si es necesario, revise los datos registrados antes de guardar.
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                     </Button>
                     <Button variant="primary" onClick={() => onSubmit(data)}>
                        Guardar
                     </Button>
                  </Modal.Footer>
               </Modal>

            </Form>

            {loading && <LoadingSpinner />}
            <Toaster />
            {redirect && <Navigate to={RouterLinks.HistoriaClinica} />}
         </Container>



      </div>
   );
};

export default PlacaBacteriana;


export const WindowModal = ({ active, handleClose, onSubmit }) => {

   return (
      <Modal centered show={active} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>¡Advertencia!</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            Una vez usted oprima el botón de <b>Guardar</b>, la información que usted suministró no podrá ser editada después. <br />
            Si es necesario, revise los datos registrados antes de guardar.
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               Cerrar
            </Button>
            <Button variant="primary" onSubmit={onSubmit}>
               Guardar
            </Button>
         </Modal.Footer>
      </Modal>
   );
};