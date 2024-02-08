import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import TituloPaginas from '../../components/TituloPaginas';
import Subtitulos from '../../components/Subtitulos';
import '../../styles/css/EvaluacionRiesgo.css';
import InputCheck from '../../components/InputCheck';
import { useForm } from 'react-hook-form';
import { useApi } from '../../hooks/useApi';
import InputTextField from '../../components/InputTextField';
import BottonSubmit from '../../components/BottonSubmit';
import Cookies from 'universal-cookie';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { RouterLinks } from '../../constants/RouterLinks';
import ObservacionDocente from '../../components/ObservacionDocente';
import IdentificacionPaciente from '../../components/IdentificacionPaciente';


const initialForm = {
   method: 'post',
   url: '/evaluacionRiesgoCaries',
   pufa: {
      opcion: "",
      indice: ""
   },
   lesiones_activas: "",
   espejo_piso_Boca: "",
   lesiones_cavitacionales: "",
   placa_visible: "",
   riesgo_caries_dental: "",
   antecedentes_sistemicos: "",
   factores_retentivos_placa: "",
   otro: {
      opcion: "",
      motivo: ""
   }
}

const cookies = new Cookies();

const EvaluacionRiesgo = () => {

   const { register, formState: { errors }, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();
   const [redirect, setRedirect] = useState(false);

   const onSubmit = async (data) => {

      data['idPaciente'] = localStorage.getItem('idPaciente');

      const res = await api_handleSubmit(data);

      if (res.status === 200) {
         cookies.set('menssage', res.data, { path: '/' });
         setRedirect(true);
      } 
   }

   useEffect(() => {
      
   }, []);

   return (
      <div className='EvaluacionRiesgo'>
         

         <Container>
         <IdentificacionPaciente />

            <TituloPaginas titulo="Evaluación de Riesgo de Caries Dental" />

            <Form onSubmit={handleSubmit(onSubmit)}>
               <Card>
                  <Subtitulos subtitulo={"Responda las siguientes preguntas y marque una de las opciones:"} />

                  <ol>
                     <Row className='my-4'>
                        <Col>
                           <li>PUFA (pulpitis, úlcera, fístula, absceso)</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`pufa.opcion`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('pufa.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("pufa.indice", {})} //required: true
                                    type="text" placeholder="¿Cuál es su índice de PUFA?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>¿Presenta lesiones activas?</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`lesiones_activas`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>¿El espejo se adhiere al piso de la boca?</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`espejo_piso_Boca`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>¿Presenta lesiones cavitacionales?</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`lesiones_cavitacionales`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>¿Hay placa visible clínicamente?</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`placa_visible`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>Antecedentes sistémicos</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`antecedentes_sistemicos`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>Factores locales retentivos de placa</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`factores_retentivos_placa`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>Otros:</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`otro.opcion`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('otro.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("otro.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuáles?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col>
                           <li>¿Riesgo de paciente para caries dental?</li>
                        </Col>
                        <Col>
                           <InputCheck
                              {...register(`riesgo_caries_dental`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                  </ol>
               </Card>

               <br />
               <Card>
                  <ObservacionDocente  {...register(`observacionesDocente`, {})} />
               </Card>

               <BottonSubmit disable={watch(`observacionesDocente`) === "" && true} />

            </Form>
         </Container>

         {loading && <LoadingSpinner />}
         <Toaster />
         {redirect && <Navigate to={RouterLinks.HistoriaClinica} />}
      </div>
   );
};

export default EvaluacionRiesgo;