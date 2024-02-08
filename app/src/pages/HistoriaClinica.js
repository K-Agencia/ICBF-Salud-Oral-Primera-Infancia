import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card, Col, Container, Row, Tab, Table, Tabs } from 'react-bootstrap';
import IdentificacionPaciente from '../components/IdentificacionPaciente';
import InputTextField from '../components/InputTextField';
import InputTextGroup from '../components/InputTextGroup';
import Subtitulos from '../components/Subtitulos';
import TituloPaginas from '../components/TituloPaginas';
import { ItemCariesDental } from '../constants/ItemsCariesDental';
import { ItemsPlacaBacteriana } from '../constants/ItemsPlacaBacteriana';
import { Encias, ExtraOral, TejidosBlandos, TejidosDentales } from '../constants/PreguntasAiepi';
import { useApi } from '../hooks/useApi';
import Cookies from 'universal-cookie';
import { RouterLinks } from '../constants/RouterLinks';
import { toast, Toaster } from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/css/CariesDental.css';

import '../styles/css/HistoriaClinica.css';
// import NavigationBar from '../components/NavigationBar';

const cookies = new Cookies();

const HistoriaClinica = () => {

   const { loading, api_handleSubmit } = useApi();
   const [data, setData] = useState([]);

   const getData = async () => {

      const res = await api_handleSubmit({
         method: 'get',
         url: '/historiasClinicas',
         params: {
            id: localStorage.getItem('idPaciente')
         }
      })
      console.log(res.data);
      setData(res.data);

   }

   const tipoDocumento = (tipo) => {
      let valor = "";
      if (tipo === "RC") {
         valor = "Registro civil de nacimiento";
      } else if (tipo === "TI") {
         valor = "Tarjeta de identidad";
      } else if (tipo === "PA") {
         valor = "Pasaporte";
      } else if (tipo === "CC") {
         valor = "Cédula de ciudadanía";
      } else {
         valor = "Cédula de extranjeria";
      }

      return valor;
   }

   useEffect(() => {
      if (cookies.get('menssage')) {
         toast.success(cookies.get("menssage"), {
            duration: 7000,
            position: 'top-center'
         })
         cookies.remove('menssage', { path: '/' })
      }

      getData();
   }, []);

   return (
      <div className='HistoriaClinica'>


         <IdentificacionPaciente />

         {data.map((item, index) => {
            return (
               (
                  <Container key={index}>

                     <TituloPaginas titulo={"Historia Clínica"} />

                     <div className='FormsFaltantes mb-4'>
                        <Accordion defaultActiveKey="0">
                           <Accordion.Item eventKey="0">
                              <Accordion.Header>Formularios Faltantes</Accordion.Header>
                              <Accordion.Body>
                                 {item.id_consentimientos === null && <Row>
                                    <Col className='mb-1'>
                                       <Button onClick={() => window.location.href = RouterLinks.Consentimiento} variant='warning'>Editar</Button>{"Autorización por parte del padre de familia"}
                                    </Col>
                                 </Row>}
                                 {item.id_antecedentes === null && <Row>
                                    <Col className='mb-1'>
                                       <Button disabled={item.id_consentimientos === null ? true : false} onClick={() => window.location.href = RouterLinks.Antecedentes} variant={item.id_consentimientos === null ? 'secondary' : 'warning'}>Editar</Button>{"Antecedentes de salud general"}
                                    </Col>
                                 </Row>}
                                 {item.id_evaluacionSaludBucal === null && <Row>
                                    <Col className='mb-1'>
                                       <Button disabled={item.id_consentimientos === null ? true : false} onClick={() => window.location.href = RouterLinks.EvaluacionSaludBucal} variant={item.id_consentimientos === null ? 'secondary' : 'warning'}>Editar</Button>{"Evaluación de Salud Bucal: AIEPI"}
                                    </Col>
                                 </Row>}
                                 {item.id_placa_bacteriana === null && <Row>
                                    <Col className='mb-1'>
                                       <Button disabled={item.id_consentimientos === null ? true : false} onClick={() => window.location.href = RouterLinks.PlacaBacteriana} variant={item.id_consentimientos === null ? 'secondary' : 'warning'}>Editar</Button>{"Medición De Placa Bacteriana"}
                                    </Col>
                                 </Row>}
                                 {item.id_caries === null && <Row>
                                    <Col className='mb-1'>
                                       <Button disabled={item.id_consentimientos === null ? true : false} onClick={() => window.location.href = RouterLinks.CariesDental} variant={item.id_consentimientos === null ? 'secondary' : 'warning'}>Editar</Button>{"Examen Clínico De Caries Dental"}
                                    </Col>
                                 </Row>}
                                 {item.id_evaluacion_riego_caries === null && <Row>
                                    <Col className='mb-1'>
                                       <Button disabled={item.id_consentimientos === null ? true : false} onClick={() => window.location.href = RouterLinks.EvaluacionRiesgo} variant={item.id_consentimientos === null ? 'secondary' : 'warning'}>Editar</Button>{"Evaluación de Riesgo de Caries Dental"}
                                    </Col>
                                 </Row>}
                                 {item.id_carnetFluorizacion === null && <Row>
                                    <Col className='mb-1'>
                                       <Button disabled={item.id_consentimientos === null ? true : false} onClick={() => window.location.href = RouterLinks.CarnetFluorizacion} variant={item.id_consentimientos === null ? 'secondary' : 'warning'}>Editar</Button>{"Carnet de Fluorización"}
                                    </Col>
                                 </Row>}
                              </Accordion.Body>
                           </Accordion.Item>
                        </Accordion>
                     </div>

                     <Card className='mb-3'>
                        <Subtitulos subtitulo={"Información Personal"} />
                        <Row className='my-2'>
                           <Col xs={12} md={3} className="">
                              <InputTextField label="Tipo de documento" readOnly defaultValue={tipoDocumento(item.tipoNoDocumentoPaciente)} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="number" label="Número de documento" readOnly defaultValue={item.noDocumentos} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Nombres" readOnly defaultValue={item.nombres} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Apellidos" readOnly defaultValue={item.apellidos} />
                           </Col>
                        </Row>

                        <hr />

                        <Subtitulos subtitulo={"Información de nacimiento"} />
                        <Row className='my-2'>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Fecha de nacimiento" readOnly defaultValue={new Date(item.fechasNacimiento).toLocaleDateString()} />
                           </Col>
                           {/* <Col xs={12} md={3} className="">
                               <InputTextField label="Departamento" readOnly defaultValue={item.} /> 
                           </Col>*/}
                           <Col xs={12} md={3} className="">
                              <InputTextField label="Municipio" readOnly defaultValue={item.ciudadNacimiento} />
                           </Col>
                        </Row>

                        <hr />

                        <Subtitulos subtitulo={"Información de residencia"} />
                        <Row className='my-2'>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Dirección de residencia" readOnly defaultValue={item.direccionesResidencial} />
                           </Col>
                           {/* <Col xs={12} md={3} className="">
                               <InputTextField label="Departamento" readOnly defaultValue={item.} /> 
                           </Col>*/}
                           <Col xs={12} md={3} className="">
                              <InputTextField label="Municipio" readOnly defaultValue={item.ciudadResidencial} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Barrio de residencia" readOnly defaultValue={item.barriosResidencial} />
                           </Col>
                        </Row>
                        <hr />
                        <Subtitulos subtitulo={"Información E.P.S."} />
                        <Row>
                           <Col xs={12} md={3} className="">
                              <InputTextField label="E.P.S." readOnly defaultValue={item.eps} />
                           </Col>
                        </Row>
                     </Card>

                     <Card className='mb-3'>
                        <Subtitulos subtitulo={"Información del acudiente"} />
                        <Row>
                           <Col xs={12} md={3} className="">
                              <InputTextField label="Tipo de documento" readOnly defaultValue={tipoDocumento(item.tipoDocumentoAcudientes)} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="number" label="Número de documento" readOnly defaultValue={item.noDocumentoAcudientes} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Nombres" readOnly defaultValue={item.nombresAcudientes} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="text" label="Apellidos" readOnly defaultValue={item.apellidosAcudientes} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField type="number" label="Teléfono de contacto" readOnly defaultValue={item.telefonoAcudientes} />
                           </Col>
                           <Col xs={12} md={3} className="">
                              <InputTextField label="Parentesco" readOnly defaultValue={item.parentescoAcudientes} />
                           </Col>
                        </Row>
                     </Card>

                     <Tabs
                        defaultActiveKey="HCAntecedentes"
                        id="justify-tab-example"
                        justify
                     >
                        <Tab eventKey="HCAntecedentes" title="Antecedentes de salud general" disabled={item.id_antecedentes === null && true}>
                           {item.id_antecedentes !== null &&
                              <>
                                 <TituloPaginas titulo={"Antecedentes de salud general"} />
                                 <HCAntecedentes data={item} />
                              </>
                           }
                        </Tab>
                        <Tab eventKey="HCEvaluacionSaludBucal" title="Evaluación de Salud Bucal: AIEPI" disabled={item.id_evaluacionSaludBucal === null && true}>
                           {item.id_evaluacionSaludBucal !== null &&
                              <>
                                 <TituloPaginas titulo={"Evaluación de Salud Bucal: AIEPI"} />
                                 <HCEvaluacionSaludBucal data={item} />
                              </>
                           }
                        </Tab>
                        <Tab eventKey="HCPlacaBacteriana-tab" title="Medición De Placa Bacteriana" disabled={item.id_placa_bacteriana === null && true}>
                           {item.id_placa_bacteriana !== null &&
                              <>
                                 <TituloPaginas titulo={"Medición De Placa Bacteriana"} />
                                 <HCPlacaBacteriana data={item} />
                              </>
                           }
                        </Tab>
                        <Tab eventKey="HCCariesDental" title="Examen Clínico De Caries Dental" disabled={item.id_caries === null && true}>
                           {item.id_caries !== null &&
                              <>
                                 <TituloPaginas titulo={"Examen Clínico De Caries Dental"} />
                                 <HCCariesDental data={item} />
                              </>
                           }
                        </Tab>
                        <Tab eventKey="HCEvaluacionRiesgo" title="Evaluación de Riesgo de Caries Dental" disabled={item.id_evaluacion_riego_caries === null && true}>
                           {item.id_evaluacion_riego_caries !== null &&
                              <>
                                 <TituloPaginas titulo={"Evaluación de Riesgo de Caries Dental"} />
                                 <HCEvaluacionRiesgo data={item} />
                              </>
                           }
                        </Tab>
                        <Tab eventKey="HCCarnetFluorizacion" title="Carnet de Fluorización" disabled={item.id_carnetFluorizacion === null && true}>
                           {item.id_carnetFluorizacion !== null &&
                              <>
                                 <TituloPaginas titulo={"Carnet de Fluorización"} />
                                 <HCCarnetFluorizacion data={item} />
                              </>
                           }
                        </Tab>
                     </Tabs>
                  </Container>
               )
            )
         })}

         {loading && <LoadingSpinner />}
         <Toaster />
      </div>
   );
};

export default HistoriaClinica;

export const HCAntecedentes = ({ data }) => {
   return (
      <Card className='mb-3 seccionAntecedentes'>
         <ol type="1">
            <Row className='my-4'>
               <Col md={6}>
                  <li>¿Cuándo fue la última vez que el niño(a) asistió a consulta con el Médico?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.ultimaConsulta_tiempo} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿Cuál fue el motivo de la Consulta Médica del niño(a)?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.ultimaConsulta_motivo} plaintext />
                  {data.ultimaConsulta_motivo === 'otro' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuál fue el motivo?" readOnly defaultValue={data.ultimaConsulta_otro} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>Último control médico:</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <Row>
                     <Col>
                        <InputTextField type="text" label="Fecha" readOnly defaultValue={new Date(data.control_fecha).toLocaleDateString()} />
                     </Col>
                     <Col>
                        <InputTextGroup type="text" label="Talla" sufijo={"cm"} readOnly defaultValue={data.control_talla} />
                     </Col>
                     <Col>
                        <InputTextGroup type="text" label="Peso" sufijo={"kg"} readOnly defaultValue={data.control_peso} />
                     </Col>
                  </Row>
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿Durante el periodo de embarazo hubo alguna complicación?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.embarazo_opcion !== "" && data.embarazo_opcion === 'N' ? "No" : "Si"} plaintext />
                  {data.embarazo_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuál fue el motivo?" readOnly defaultValue={data.embarazo_motivo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿El parto fue en el tiempo esperado?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.parto} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿Desde que el niño(a) nació hasta la fecha, ha sufrido de alguna enfermedad?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.enfermedad_opcion !== "" && data.enfermedad_opcion === 'N' ? "No" : "Si"} plaintext />
                  {data.enfermedad_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuál enfermedad?" readOnly defaultValue={data.enfermedad_motivo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿El niño(a) ha estado hospitalizado?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.hospitalizacion_opcion !== "" && data.hospitalizacion_opcion === 'N' ? "No" : "Si"} plaintext />
                  {data.hospitalizacion_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuánto tiempo" readOnly defaultValue={data.hospitalizacion_tiempo} />
                        <InputTextField type="text" label="¿Cuál fué el motivo?" readOnly defaultValue={data.hospitalizacion_motivo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿El niño(a) está tomando algún medicamento de rutina?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.medicamentos_opcion !== "" && data.medicamentos_opcion === 'N' ? "No" : "Si"} plaintext />
                  {data.medicamentos_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuál medicamento?" readOnly defaultValue={data.medicamentos_motivo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿Le han practicado al niño(a) alguna cirugía?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.cirugia_opcion !== "" && data.cirugia_opcion === 'N' ? "No" : "Si"} plaintext />
                  {data.cirugia_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuál fué el motivo?" readOnly defaultValue={data.cirugia_motivo} />
                        <InputTextField type="text" label="¿Hace cuánto tiempo?" readOnly defaultValue={data.cirugia_tiempo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿De acuerdo con recomendación del médico, el niño(a) requiere algún cuidado especial para la atención odontológica?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.cuidadoEspecial_opcion !== "" && data.cuidadoEspecial_opcion === 'N' ? "No" : "Si"} plaintext />
                  {data.cuidadoEspecial_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField type="text" label="¿Cuál cuidado?" readOnly defaultValue={data.cuidadoEspecial_motivo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿Lo ha llevado al odontólogo en el último año?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.visitaOd_opcion !== "" && data.visitaOd_opcion === 'N' ? "No" : "Si"} plaintext />
               </Col>
            </Row>

            <Row className='my-4'>
               <Col md={6}>
                  ¿Cada cuánto tiempo acostumbra llevarlo?
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" label="¿Cuánto tiempo?" readOnly defaultValue={data.visitaOd_tiempo} />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>¿La última vez que llevo al niño(a) al odontólogo cuál fue el motivo?</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <ul>
                     {data.visitaOd_m_valoracion !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Valoración"} /></li>}
                     {data.visitaOd_m_aplicacionFluor !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Aplicación Flúor"} /></li>}
                     {data.visitaOd_m_limpieza !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Limpieza"} /></li>}
                     {data.visitaOd_m_calzarDientes !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Calzar Dientes"} /></li>}
                     {data.visitaOd_m_retirarNervio !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Retirar nervio del diente"} /></li>}
                     {data.visitaOd_m_retirarDiente !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Retirar un diente"} /></li>}
                     {data.visitaOd_m_urgencia !== '-' && <li><InputTextField type="text" plaintext defaultValue={"Urgencia (dolor, absceso...)"} /></li>}
                  </ul>
                  {data.visitaOd_m_u_motivo !== null &&
                     <Col className='mt-3'>
                        <InputTextField type="text" readOnly defaultValue={data.visitaOd_m_u_motivo} />
                     </Col>}
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col md={6}>
                  <li>La experiencia en las visitas previas del niño(a) al odontólogo han sido</li>
               </Col>
               <Col md={6} className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.experiencias} />
               </Col>
            </Row>
         </ol>
      </Card>
   )
};

export const HCEvaluacionSaludBucal = ({ data }) => {
   return (
      <Card>
         <ul>
            <Card className='mb-3'>
               <Subtitulos subtitulo={"Examen Extra-Oral"} />
               {ExtraOral.map(({ db, pregunta }, index) => {
                  if (data[db] !== "") {
                     return (
                        <Row key={index} className="my-1">
                           <Col>
                              <li><p>{pregunta}</p></li>
                           </Col>
                           <Col>
                              <InputTextField type="text" defaultValue={data[db]} readOnly />
                           </Col>
                        </Row>
                     )
                  }
               })}
            </Card>

            <Card className='mb-3'>
               <Subtitulos subtitulo={"Examen Intra-Oral"} />
               <Subtitulos subtitulo={"Tejidos blandos:"} />
               {TejidosBlandos.map((item, index) => {
                  if (data[`${item.db}`] !== "") {
                     return (
                        <Row key={index} className="my-1">
                           <Col>
                              <li><p>{item.pregunta}</p></li>
                           </Col>
                           <Col>
                              <InputTextField type="text" defaultValue={data[`${item.db}`]} readOnly />
                           </Col>
                        </Row>
                     )
                  }
               })}
               <hr />
               <Subtitulos subtitulo={"Encía con presencia de:"} />

               {Encias.map((item, index) => {
                  if (data[`${item.db}`] !== "") {
                     return (
                        <Row key={index} className="my-1">
                           <Col>
                              <li><p>{item.pregunta}</p></li>
                           </Col>
                           <Col>
                              <InputTextField type="text" defaultValue={data[`${item.db}`]} readOnly />
                           </Col>
                        </Row>
                     )
                  }
               })}

               <hr />

               <Subtitulos subtitulo={"Tejidos dentales con presencia de:"} />

               {TejidosDentales.map((item, index) => {
                  if (data[`${item.db}`] !== "") {
                     return (
                        <Row key={index} className="my-1">
                           <Col>
                              <li><p>{item.pregunta}</p></li>
                           </Col>
                           <Col>
                              <InputTextField type="text" defaultValue={data[`${item.db}`]} readOnly />
                           </Col>
                        </Row>
                     )
                  }
               })}
            </Card>
         </ul>
      </Card>
   )
};

export const HCPlacaBacteriana = ({ data }) => {

   let arr = [];
   let numsus = 0;
   let mediana = 0;

   for (const property in data) {
      if (property.split('_')[0] === 'pb') {
         arr.push(data[property])
      }
   }

   let numeros = arr.sort((x, y) => x - y);
   let mitad = Math.floor(numeros.length / 2);

   if (numeros.length % 2 === 1) {
      mediana = numeros[mitad];
   } else if (numeros.length === 2) {
      mediana = (parseInt(numeros[0]) + parseInt(numeros[1])) / 2
   } else {
      mediana = (parseInt(numeros[mitad]) + parseInt(numeros[mitad + 1])) / 2
   }

   numsus = numeros.length;

   return (
      <div className='PlacaBacteriana'>
         <Card className='mb-3'>
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
                  <Table bordered responsive>
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
                           {ItemsPlacaBacteriana.map((item, index) => {
                              let nombre = item.split('_')[1].split('.');
                              return (
                                 <td key={index}>
                                    <InputTextField
                                       type="number" readOnly defaultValue={data[`pb_${nombre[0]}_${nombre[1]}`]} plaintext />
                                 </td>
                              )
                           })}
                        </tr>
                     </tbody>
                  </Table>
               </Col>
            </Row>
         </Card>
         <Card>
            <Row>
               <Col xs={12} sm={6} className=''>
                  <Card className='calculos'>
                     <Card.Body>
                        <b>Numero de superficies Examinadas: </b>
                        <h1>{numsus}</h1>
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
      </div>
   )
};

export const HCCariesDental = ({ data }) => {

   const [evalDientes, setEvalDientes] = useState({});
   const [tablas, setTablas] = useState({
      C: 0, O: 0, P: 0
   });


   const dientesF1 = [16, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 26];
   const dientesF2 = [46, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, 36];
   const letras = ["O", "M", "D", "V", "P", "L"];
   const tipos = ["con", "car"]

   const totalDientes = dientesF1.concat(dientesF2);

   const calcular = () => {

      let total = {};
      const cariados = [20, 21, 40, 41, 60, 61];

      for (let i = 0; i < totalDientes.length; i++) {

         let arr = [];

         for (let j = 0; j < letras.length; j++) {
            for (let k = 0; k < tipos.length; k++) {
               Object.keys(data)
                  .filter(clave => clave === `c_${totalDientes[i]}_${letras[j]}_${tipos[k]}`)
                  .map(clave => arr.push(parseInt(data[clave])));
            }
         }

         let numeros = arr.sort((x, y) => x - y);
         let letra = "";

         if (numeros.find(e => e === 97)) {
            letra = 'e'
         } else if (numeros.find(e => e === 96)) {
            letra = 'P'
         } else if (numeros.find(e => cariados.includes(e))) {
            letra = 'C'
         } else if (numeros.find(e => e === 80)) {
            letra = 'O';
         } else if (numeros.find(e => e === 70) || (numeros.find(e => e === 0) + 1)) {
            letra = 'S'
         }


         total[`c_${totalDientes[i]}`] = letra
      }

      setEvalDientes(total);
      valorLetras(total);
   }

   const valorLetras = (arr) => {
      let arrletras = []

      for (const property in arr) {
         if (arr[property] !== "") {
            arrletras.push(arr[property])
         }
      }

      const countLetras = {};

      for (let i = 0; i < arrletras.length; i++) {
         if (countLetras[arrletras[i]]) {
            countLetras[arrletras[i]]++;
         } else {
            countLetras[arrletras[i]] = 1;
         }
      }

      setTablas(countLetras);
   }

   useEffect(() => {
      calcular();
   }, []);

   return (
      <div className="CariesDental">
         <Card className='card-copd mb-5'>
            <h5>ceo-D</h5>
            <hr />
            <Col xs={12}>
               <Table bordered>
                  <thead>
                     <tr>
                        <td colSpan={2}><b>Condiciones</b></td>
                        <td><b>Dientes</b></td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="tipo_condicion" colSpan={2}>Total evaluados</td>
                        <td>{
                           (tablas.C === undefined ? 0 : tablas.C) +
                           (tablas.P === undefined ? 0 : tablas.P) +
                           (tablas.O === undefined ? 0 : tablas.O)
                        }</td>
                     </tr>
                     <tr>
                        <td>c</td>
                        <td className="tipo_condicion">Cariados</td>
                        <td>{tablas.C === undefined ? 0 : tablas.C}</td>
                     </tr>
                     <tr>
                        <td>e</td>
                        <td className="tipo_condicion">Extraído por caries</td>
                        <td>{tablas.P === undefined ? 0 : tablas.P}</td>
                     </tr>
                     <tr>
                        <td>o</td>
                        <td className="tipo_condicion">Obturados</td>
                        <td>{tablas.O === undefined ? 0 : tablas.O}</td>
                     </tr>
                  </tbody>
               </Table>
            </Col>
         </Card>

         <Card>
            <Card>
               <Table bordered>
                  <thead>
                     <tr>
                        <td className='td_info'>
                           H
                           {/* <VscInfo className='infoCaries' /> onClick={() => setModalShow(true)} */}
                        </td>
                        {dientesF1.map((diente, index) => (
                           <td key={index} colSpan={2}>{diente}</td>
                        ))
                        }
                     </tr>
                     <tr>
                        <td>COP-D</td>
                        {dientesF1.map((diente, index) => (
                           <td className="letraTable" key={index} colSpan={2}>{evalDientes[`c_${diente}`]}</td>
                        ))
                        }
                     </tr>
                     <tr>
                        <td>C sup.</td>
                        {dientesF1.map((diente, index) => (
                           <>
                              <td key={index}>Con</td>
                              <td key={index + 1}>Car</td>
                           </>
                        ))
                        }
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>O</td>
                        {ItemCariesDental.fila1.O.map((diente, index) => {

                           if (diente !== 'dd') {
                              let nam = diente.split('_')[1].split('.');
                              return (
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              )
                           } else {
                              return (
                                 <td className='nullCell'></td>
                              )
                           }
                        })
                        }
                     </tr>
                     <tr>
                        <td>M</td>
                        {ItemCariesDental.fila1.M.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                     <tr>
                        <td>D</td>
                        {ItemCariesDental.fila1.D.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                     <tr>
                        <td>V</td>
                        {ItemCariesDental.fila1.V.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                     <tr>
                        <td>P</td>
                        {ItemCariesDental.fila1.P.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                  </tbody>
               </Table>
            </Card>

            <br />

            <Card>
               <Table bordered>
                  <thead>
                     <tr>
                        <td className='td_info'>
                           H
                           {/* <VscInfo className='infoCaries' /> onClick={() => setModalShow(true)} */}
                        </td>
                        {dientesF2.map((diente, index) => (
                           <td key={index} colSpan={2}>{diente}</td>
                        ))
                        }
                     </tr>
                     <tr>
                        <td>COP-D</td>
                        {dientesF2.map((diente, index) => (
                           <td className="letraTable" key={index} colSpan={2}>{evalDientes[`c_${diente}`]}</td>
                        ))
                        }
                     </tr>
                     <tr>
                        <td>C sup.</td>
                        {dientesF2.map((diente, index) => (
                           <>
                              <td key={index}>Con</td>
                              <td key={index + 1}>Car</td>
                           </>
                        ))
                        }
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>O</td>
                        {ItemCariesDental.fila2.O.map((diente, index) => {

                           if (diente !== 'dd') {
                              let nam = diente.split('_')[1].split('.');
                              return (
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              )
                           } else {
                              return (
                                 <td className='nullCell'></td>
                              )
                           }
                        })
                        }
                     </tr>
                     <tr>
                        <td>M</td>
                        {ItemCariesDental.fila2.M.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                     <tr>
                        <td>D</td>
                        {ItemCariesDental.fila2.D.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                     <tr>
                        <td>V</td>
                        {ItemCariesDental.fila2.V.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                     <tr>
                        <td>L</td>
                        {ItemCariesDental.fila2.L.map((diente, index) => {
                           let nam = diente.split('_')[1].split('.');
                           return (
                              <>
                                 <td key={index} className={""}>
                                    <InputTextField type="number" readOnly plaintext defaultValue={data[`c_${nam[0]}_${nam[1]}_${nam[2]}`]} />
                                 </td>
                              </>
                           )
                        })
                        }
                     </tr>
                  </tbody>
               </Table>
            </Card>
         </Card>
      </div>
   )
}

export const HCEvaluacionRiesgo = ({ data }) => {
   return (
      <Card>
         <Subtitulos subtitulo={"Responda las siguientes preguntas y marque una de las opciones:"} />

         <ol>
            <Row className='my-4'>
               <Col>
                  <li>PUFA (pulpitis, úlcera, fístula, absceso)</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.pufa_opcion !== "" && data.pufa_opcion === 'S' ? "Si" : "No"} plaintext />
                  {data.pufa_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField
                           type="text" placeholder="¿Cuál es su índice de PUFA?" />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>¿Presenta lesiones activas?</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.lesiones_activas !== "" && data.lesiones_activas === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>¿El espejo se adhiere al piso de la boca?</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.espejo_piso_boca !== "" && data.espejo_piso_boca === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>¿Presenta lesiones cavitacionales?</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.lesiones_cavitacionales !== "" && data.lesiones_cavitacionales === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>¿Hay placa visible clínicamente?</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.placa_visible !== "" && data.placa_visible === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>Antecedentes sistémicos</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.antecedentes_sistemicos !== "" && data.antecedentes_sistemicos === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>Factores locales retentivos de placa</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.factores_retentivos_placa !== "" && data.factores_retentivos_placa === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>Otros:</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.otro_opcion !== "" && data.otro_opcion === 'S' ? "Si" : "No"} plaintext />
                  {data.otro_opcion !== "" && data.otro_opcion === 'S' &&
                     <Col className='mt-3'>
                        <InputTextField
                           type="text" readOnly defaultValue={data.otro_motivo} />
                     </Col>
                  }
               </Col>
            </Row>

            <hr />

            <Row className='my-4'>
               <Col>
                  <li>¿Riesgo de paciente para caries dental?</li>
               </Col>
               <Col className="antecedentes">
                  <InputTextField type="text" readOnly defaultValue={data.riesgo_caries_dental !== "" && data.riesgo_caries_dental === 'S' ? "Si" : "No"} plaintext />
               </Col>
            </Row>

         </ol>
      </Card>
   )
}

export const HCCarnetFluorizacion = ({ data }) => {
   return (
      <div className="CarnetFluorizacion">
         <Card>
            <h4>Responda las siguientes preguntas y marque una de las opciones:</h4>

            <ol>
               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Se entrega carnet de fluorización diligenciado con actividades realizadas</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.entrega !== '' && data.entrega === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Fecha de entrega</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.fecha_entrega} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Persona que recibe el carnet de fluorización</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.receptor_carnet} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Contacto de la persona que recibe el carnet de fluorización</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.contacto_receptor_carnet} />
                  </Col>
               </Row>

               <hr />

               <Subtitulos subtitulo={"Actividades realizadas:"} />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Sesión educativa para padres / cuidadores</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.sesion_educativa !== '' && data.sesion_educativa === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Control de Placa</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.control_placa !== '' && data.control_placa === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Educación en salud bucal</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.educacion_salud_bucal !== '' && data.educacion_salud_bucal === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Entrega de kit de cepillado dental</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.entrega_kit !== '' && data.entrega_kit === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Cepillado dental</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.cepillado_dental !== '' && data.cepillado_dental === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Valoración de Caries</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.valoracion_caries !== '' && data.valoracion_caries === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Valoración AIEPI Bucal</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.valoracion_aiepi !== '' && data.valoracion_aiepi === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Aplicación de Barniz de flúor</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.aplicacion_barniz !== '' && data.aplicacion_barniz === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

               <Row className='my-4'>
                  <Col xs={12} sm={6}>
                     <li>Entrega de informe a Padres y Remisión</li>
                  </Col>
                  <Col xs={12} sm={6} className="antecedentes">
                     <InputTextField type="text" readOnly defaultValue={data.entrega_remision !== '' && data.entrega_remision === 'S' ? "Si" : 'No'} />
                  </Col>
               </Row>

               <hr />

            </ol>
         </Card>
      </div>
   )
}