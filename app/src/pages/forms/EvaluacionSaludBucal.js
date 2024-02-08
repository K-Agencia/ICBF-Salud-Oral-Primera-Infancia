import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit.js';
import IdentificacionPaciente from '../../components/IdentificacionPaciente.js';
import InputCheck from '../../components/InputCheck.js';
import InputTextField from '../../components/InputTextField.js';
import LoadingSpinner from '../../components/LoadingSpinner.js';
import ObservacionDocente from '../../components/ObservacionDocente.js';
import Subtitulos from '../../components/Subtitulos.js';
import TituloPaginas from '../../components/TituloPaginas.js';
import { Encias, ExtraOral, TejidosBlandos, TejidosDentales } from '../../constants/PreguntasAiepi.js';
import { RouterLinks } from '../../constants/RouterLinks.js';
import { useApi } from '../../hooks/useApi.js';

import '../../styles/css/EvaluacionSaludBucal.css';

const initialForm = {
   method: 'post',
   url: '/evaluacionSaludBucal',
   extra_oral: {
      asimetria: {
         opcion: "",
         observacion: ""
      },
      rubor: {
         opcion: "",
         observacion: ""
      },
      dolorEnCara: {
         opcion: "",
         observacion: ""
      },
      otro: ""
   },
   intra_oral: {
      tejidosBlandos: {
         lengua: {
            opcion: "",
            observacion: ""
         },
         carrillos: {
            opcion: "",
            observacion: ""
         },
         pisoBoca: {
            opcion: "",
            observacion: ""
         },
         otro: ""
      },
      encias: {
         fisuras: {
            opcion: "",
            observacion: ""
         },
         tumefaccion: {
            opcion: "",
            observacion: ""
         },
         gingivitis: {
            opcion: "",
            observacion: ""
         },
         placaBactMadura: {
            opcion: "",
            observacion: ""
         },
         placaBactInmadura: {
            opcion: "",
            observacion: ""
         },
         calculos: {
            opcion: "",
            observacion: ""
         }
      },
      tejidos_dentales: {
         cambioColor: {
            opcion: "",
            observacion: ""
         },
         fracturas: {
            opcion: "",
            observacion: ""
         },
         movilidadPatologica: {
            opcion: "",
            observacion: ""
         },
         extracion: {
            opcion: "",
            observacion: ""
         },
         lecionesManchas: {
            opcion: "",
            observacion: ""
         },
         microcavidades: {
            opcion: "",
            observacion: ""
         },
         cavidadesDetectables: {
            opcion: "",
            observacion: ""
         },
         obtCompatibles: {
            opcion: "",
            observacion: ""
         },
         obtRetentivas: {
            opcion: "",
            observacion: ""
         },
         obtDefectuosas: {
            opcion: "",
            observacion: ""
         },
         alteraciones: {
            opcion: "",
            observacion: ""
         },
         defectosEsmalte: {
            opcion: "",
            observacion: ""
         },
         alteracionesEsqueleticas: {
            opcion: "",
            observacion: ""
         },
         maloclusion: {
            opcion: "",
            observacion: ""
         }
      }
   },
   remision: "",
   observaciones: "",
   clasificar: "",
   observacionesDocente: ""
}

const cookies = new Cookies();

const EvaluacionSaludBucal = () => {

   const { register, formState: { errors }, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();
   const [redirect, setRedirect] = useState(false);
   const [active, setActive] = useState(false);

   const [data, setData] = useState({});
   const handleClose = () => setActive(false);

   const onModal = (data) => {
      setData(data);
      setActive(true)
   }

   const onSubmit = async (data) => {

      data['idPaciente'] = localStorage.getItem('idPaciente');
      handleClose();

      const res = await api_handleSubmit(data);

      if (res.status === 200) {
         cookies.set('menssage', res.data, { path: '/' });
         setRedirect(true);
      }
   }
   useEffect(() => {

   }, []);

   return (
      <div className='EvaluacionSaludBucal'>
         

         <Container>
         <IdentificacionPaciente />

            <TituloPaginas titulo="Evaluación de Salud Bucal: AIEPI" />

            <Form onSubmit={handleSubmit(onModal)}>
               <Card className='mb-3'>
                  <Subtitulos subtitulo={"Examen Extra-Oral"} />
                  {ExtraOral.map((item, index) => (
                     <Row key={index} className="my-1">
                        <Col>
                           <InputCheck
                              {...register(`${item.name}.opcion`, {})} //required: true
                              type="checkbox"
                              options={[
                                 { label: item.pregunta }
                              ]} />
                        </Col>
                        <Col>
                           <InputTextField
                              {...register(`${item.name}.observacion`, {})} //required: true
                              type="text" placeholder="Descripción" error={errors.correo} disabled={!watch(`${item.name}.opcion`)} />
                        </Col>
                     </Row>
                  ))}
               </Card>

               <Card className='mb-3'>
                  <Subtitulos subtitulo={"Examen Intra-Oral"} />
                  <Subtitulos subtitulo={"Tejidos blandos:"} />
                  {TejidosBlandos.map((item, index) => (
                     <Row key={index} className="my-1">
                        <Col>
                           <InputCheck
                              {...register(`${item.name}.opcion`, {})} //required: true
                              type="checkbox"
                              options={[
                                 { label: item.pregunta }
                              ]} />
                        </Col>
                        <Col>
                           <InputTextField
                              {...register(`${item.name}.observacion`, {})} //required: true
                              type="text" placeholder="Descripción" error={errors.correo} disabled={!watch(`${item.name}.opcion`)} />
                        </Col>
                     </Row>
                  ))}
                  <hr />
                  <Subtitulos subtitulo={"Encía con presencia de:"} />

                  {Encias.map((item, index) => (
                     <Row key={index} className="my-1">
                        <Col>
                           <InputCheck
                              {...register(`${item.name}.opcion`, {})} //required: true
                              type="checkbox"
                              options={[
                                 { label: item.pregunta }
                              ]} />
                        </Col>
                        <Col>
                           <InputTextField
                              {...register(`${item.name}.observacion`, {})} //required: true
                              type="text" placeholder="Descripción" error={errors.correo} disabled={!watch(`${item.name}.opcion`)} />
                        </Col>
                     </Row>
                  ))}

                  <hr />

                  <Subtitulos subtitulo={"Tejidos dentales con presencia de:"} />

                  {TejidosDentales.map((item, index) => (
                     <Row key={index} className="my-1">
                        <Col>
                           <InputCheck
                              {...register(`${item.name}.opcion`, {})} //required: true
                              type="checkbox"
                              options={[
                                 { label: item.pregunta }
                              ]} />
                        </Col>
                        <Col>
                           <InputTextField
                              {...register(`${item.name}.observacion`, {})} //required: true
                              type="text" placeholder="Descripción" error={errors.correo} disabled={!watch(`${item.name}.opcion`)} />
                        </Col>
                     </Row>
                  ))}
               </Card>

               <hr />

               <Card className='clasificar'>
                  <Subtitulos subtitulo={"Clasificar"} />
                  <InputCheck
                     {...register(`clasificar`, {})} //required: true
                     type="radio"
                     options={[
                        {
                           label: "Paciente sano",
                           descripcion: [
                              "Encías rosadas",
                              "Ausencia de placa bacteriana o placa inmadura",
                              "Dientes sin lesiones",
                              "Obturaciones compatibles",
                           ]
                        },
                        {
                           label: "Enfermedad bucal leve / moderada",
                           descripcion: [
                              "Inflamación de encías",
                              "Lesiones de mancha blanca – café por caries",
                              "Microcavidades por caries",
                              "Presencia de placa bacteriana madura",
                              "Obturaciones retentivas o defectuosas",
                              "Defectos del desarrollo del esmalte"
                           ]
                        },
                        {
                           label: "Enfermedad bucal grave",
                           descripcion: [
                              "Dolor intenso",
                              "Inflamación de encías",
                              "Cavidades detectables en dentina o extensas",
                              "Maloclusiones",
                              "Movilidad por patología"
                           ]
                        },

                        {
                           label: "Alto riesgo de enfermedad: Compromiso sistematico",
                           descripcion: [
                              "Inflamación intra o extraoral",
                              "Malestar general",
                              "Fiebre, inapetencia, decaimiento",
                              "Pus, exudado",
                              "Enrojecimiento y deformidad de la cara",
                              "Limitación de la apertura bucal"
                           ]
                        },
                        {
                           label: "Trauma dental",
                           descripcion: [
                              "Movilidad dental trauma",
                              "Cambio de color en el diente por trauma",
                              "Cambio de color en la encía por trauma",
                              "Fractura por trauma",
                              "Pérdida del diente por trauma"
                           ]
                        }
                     ]} />
               </Card>

               <br />
               <Card>
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

export default EvaluacionSaludBucal;