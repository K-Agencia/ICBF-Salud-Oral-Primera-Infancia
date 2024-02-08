import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit';
import IdentificacionPaciente from '../../components/IdentificacionPaciente';
import InputCheck from '../../components/InputCheck';
import InputTextField from '../../components/InputTextField';
import LoadingSpinner from '../../components/LoadingSpinner';

import Subtitulos from '../../components/Subtitulos';
import TituloPaginas from '../../components/TituloPaginas';
import { RouterLinks } from '../../constants/RouterLinks';
import { useApi } from '../../hooks/useApi';
import '../../styles/css/CarnetFluorizacion.css';

const initialForm = {
   method: 'post',
   url: '/carnetFluorizacion',
   file: "",
   entrega: "",
   fecha_entrega: "",
   receptor_carnet: "",
   contacto_receptor_carnet: "",
   actividades: {
      sesion_educativa: "",
      control_placa: "",
      educacion_salud_bucal: "",
      entrega_kit: "",
      cepillado_dental: "",
      valoracion_caries: "",
      valoracion_aiepi: "",
      aplicacion_barniz: "",
      entrega_remision: ""
   }
}

const cookies = new Cookies();

const CarnetFluorizacion = () => {

   const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();

   const [redirect, setRedirect] = useState(false);

   const onSubmit = async (data) => {

      data['idPaciente'] = localStorage.getItem('idPaciente');

      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('data', JSON.stringify(data));

      const res = await api_handleSubmit(data, formData);
      // const res = await api_handleSubmit(data);

      if (res.status === 200) {
         cookies.set('url', RouterLinks.Antecedentes, { path: '/' });
         cookies.set('menssage', res.data, { path: '/' });
         setRedirect(true);
      }
   }

   useEffect(() => {

   }, []);

   return (
      <div className='CarnetFluorizacion'>
         <Container>

            <IdentificacionPaciente />

            <TituloPaginas titulo="Carnet de Fluorización" />

            <Form onSubmit={handleSubmit(onSubmit)}>
               <Card className='mb-3'>
                  <p className='leyenda'>Se debe subir un escáner del carnet de fluorización. <b>Debe ser el archivo en formato .pdf</b></p>
                  <Row>
                     <InputTextField
                        {...register("file", {})} //required: true
                        type="file" accept=".pdf" error={errors.correo} />
                  </Row>
               </Card>

               <Card>
                  <h4>Responda las siguientes preguntas y marque una de las opciones:</h4>

                  <ol>
                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Se entrega carnet de fluorización diligenciado con actividades realizadas</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`entrega`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Fecha de entrega</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputTextField
                              {...register("fecha_entrega", {})} //required: true
                              type="date" placeholder="Fecha" error={errors.correo} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Persona que recibe el carnet de fluorización</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputTextField
                              {...register(`receptor_carnet`, {})} //required: true dientes 
                              type="text" placeholder="Nombres y Apellidos" error={errors.correo} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Contacto de la persona que recibe el carnet de fluorización</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputTextField
                              {...register(`contacto_receptor_carnet`, {})} //required: true dientes 
                              type="number" placeholder="Teléfono" error={errors.correo} />
                        </Col>
                     </Row>

                     <hr />

                     <Subtitulos subtitulo={"Actividades realizadas:"} />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Sesión educativa para padres / cuidadores</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.sesion_educativa`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Control de Placa</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.control_placa`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Educación en salud bucal</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.educacion_salud_bucal`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Entrega de kit de cepillado dental</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.entrega_kit`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Cepillado dental</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.cepillado_dental`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Valoración de Caries</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.valoracion_caries`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Valoración AIEPI Bucal</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.valoracion_aiepi`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Aplicación de Barniz de flúor</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.aplicacion_barniz`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col xs={12} sm={6}>
                           <li>Entrega de informe a Padres y Remisión</li>
                        </Col>
                        <Col xs={12} sm={6}>
                           <InputCheck
                              {...register(`actividades.entrega_remision`, {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                  </ol>
               </Card>

               <BottonSubmit />

            </Form>


         </Container>

         {loading && <LoadingSpinner />}
         <Toaster />
         {redirect && <Navigate to={RouterLinks.HistoriaClinica} />}
      </div>
   );
};

export default CarnetFluorizacion;