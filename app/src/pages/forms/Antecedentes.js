import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit';
import IdentificacionPaciente from '../../components/IdentificacionPaciente';
import InputCheck from '../../components/InputCheck';
import InputTextField from '../../components/InputTextField';
import InputTextGroup from '../../components/InputTextGroup';
import LoadingSpinner from '../../components/LoadingSpinner';

import TituloPaginas from '../../components/TituloPaginas';
import { RouterLinks } from '../../constants/RouterLinks';
import { useApi } from '../../hooks/useApi';

import '../../styles/css/Antecedentes.css';

const initialForm = {
   method: 'post',
   url: '/antecedentes',
   ultimaConsulta: {
      tiempo: "",
      motivo: "",
      otro: ""
   },
   control: {
      fecha: "",
      talla: "",
      peso: ""
   },
   embarazo: {
      opcion: "",
      motivo: ""
   },
   parto: "",
   enfermedad: {
      opcion: "",
      motivo: ""
   },
   hospitalizacion: {
      opcion: "",
      tiempo: "",
      motivo: ""
   },
   medicamentos: {
      opcion: "",
      motivo: ""
   },
   cirugia: {
      opcion: "",
      motivo: "",
      tiempo: ""
   },
   cuidadoEspecial: {
      opcion: "",
      motivo: ""
   },
   visitaOdontologo: {
      opcion: "",
      tiempo: "",
      motivo: []
   },
   experiencias: ""
}

const cookies = new Cookies();

const Antecedentes = () => {

   const { register, formState: { errors }, watch, handleSubmit } = useForm({
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
      if (cookies.get('url') === RouterLinks.Consentimiento) {
         toast.success(cookies.get("menssage"), {
            duration: 7000,
            position: 'top-center'
         })
         cookies.remove('url')
         cookies.remove('menssage')
      }
   }, []);

   return (
      <div className='Antecedentes'>
         

         <Container>
         <IdentificacionPaciente />

            <TituloPaginas titulo="Antecedentes de salud general y bucal del niño(a)" />

            <Form onSubmit={handleSubmit(onSubmit)}>
               <Card className='mb-3'>
                  <ol type="1">
                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿Cuándo fue la última vez que el niño(a) asistió a consulta con el Médico?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("ultimaConsulta.tiempo", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "1 mes" },
                                 { label: "3 a 6 meses" },
                                 { label: "Más de 6 meses" },
                                 { label: "Más de 1 año" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿Cuál fue el motivo de la Consulta Médica del niño(a)?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("ultimaConsulta.motivo", {})} //required: true
                              type="radio"
                              options={[

                                 { label: "Control (Crecimiento y desarrollo)" },
                                 { label: "Vacunación" },
                                 { label: "Urgencias" },
                                 { label: "Otra" }
                              ]} />
                           {watch('ultimaConsulta.motivo') === 'Otra' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("ultimaConsulta.otro", {})} //required: true
                                    type="text" placeholder="¿Cuál fue el motivo?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>Último control médico:</li>
                        </Col>
                        <Col md={6}>
                           <Row>
                              <Col>
                                 <InputTextField
                                    {...register("control.fecha", {})} //required: true
                                    type="date" placeholder="Fecha" error={errors.correo} />
                              </Col>
                              <Col>
                                 <InputTextGroup
                                    {...register("control.talla", {})} //required: true
                                    type="number" placeholder="Talla" error={errors.correo} sufijo={"cm"} />
                              </Col>
                              <Col>
                                 <InputTextGroup
                                    {...register("control.peso", {})} //required: true
                                    type="number" placeholder="Peso" error={errors.correo} sufijo={"kg"} />
                              </Col>
                           </Row>
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿Durante el periodo de embarazo hubo alguna complicación?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("embarazo.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('embarazo.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("embarazo.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál fue el motivo?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿El parto fue en el tiempo esperado?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("parto", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 // { label: "No" },
                                 { label: "Antes de lo esperado" },
                                 { label: "Después de lo esperado" }
                              ]} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿Desde que el niño(a) nació hasta la fecha, ha sufrido de alguna enfermedad?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("enfermedad.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('enfermedad.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("enfermedad.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál enfermedad?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿El niño(a) ha estado hospitalizado?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("hospitalizacion.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('hospitalizacion.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("hospitalizacion.tiempo", {})} //required: true
                                    type="text" placeholder="¿Cuánto tiempo?" error={errors.correo} />
                                 <InputTextField
                                    {...register("hospitalizacion.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál fué el motivo?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿El niño(a) está tomando algún medicamento de rutina?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("medicamentos.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('medicamentos.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("medicamentos.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál medicamento?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿Le han practicado al niño(a) alguna cirugía?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("cirugia.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('cirugia.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("cirugia.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál fué el motivo?" error={errors.correo} />
                                 <InputTextField
                                    {...register("cirugia.tiempo", {})} //required: true
                                    type="text" placeholder="¿Hace cuánto tiempo?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿De acuerdo con recomendación del médico, el niño(a) requiere algún cuidado especial para la atención odontológica?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("cuidadoEspecial.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                           {watch('cuidadoEspecial.opcion') === 'Si' && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("cuidadoEspecial.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál cuidado?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿Lo ha llevado al odontólogo en el último año?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("visitaOdontologo.opcion", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Si" },
                                 { label: "No" }
                              ]} />
                        </Col>
                     </Row>

                     <Row className='my-4'>
                        <Col md={6}>
                           ¿Cada cuánto tiempo acostumbra llevarlo?
                        </Col>
                        <Col md={6}>
                           <InputTextField
                              {...register("visitaOdontologo.tiempo", {})} //required: true
                              type="text" placeholder="¿Cuánto tiempo?" error={errors.correo} />
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>¿La última vez que llevó al niño(a) al odontólogo cuál fue el motivo?</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("visitaOdontologo.motivo", {})} //required: true
                              type="checkbox"
                              options={[
                                 { label: "Valoración" },
                                 { label: "Aplicación Flúor" },
                                 { label: "Limpieza" },
                                 { label: "Calzar Dientes" },
                                 { label: "Retirar nervio del diente" },
                                 { label: "Sacar un diente o muela" },
                                 { label: "Urgencia (dolor, absceso...)" }
                              ]} />
                           {watch('visitaOdontologo.motivo').includes('Urgencia (dolor, absceso...)') && (
                              <Col className='mt-3'>
                                 <InputTextField
                                    {...register("visitaOdontologo.urgencia.motivo", {})} //required: true
                                    type="text" placeholder="¿Cuál cuidado?" error={errors.correo} />
                              </Col>
                           )}
                        </Col>
                     </Row>

                     <hr />

                     <Row className='my-4'>
                        <Col md={6}>
                           <li>La experiencia en las visitas previas del niño(a) al odontólogo han sido</li>
                        </Col>
                        <Col md={6}>
                           <InputCheck
                              {...register("experiencias", {})} //required: true
                              type="radio"
                              options={[
                                 { label: "Muy buena" },
                                 { label: "Buena" },
                                 { label: "Regular" },
                                 { label: "Mala" }
                              ]} />
                        </Col>
                     </Row>


                  </ol>
               </Card>
               <Card className='mb-3'>
                  <p className='leyenda'>Tome una foto o escanee el documento impreso y guárdelo en su celular como un archivo en formato <b>.pdf</b>. Luego búsquelo y guárdelo aquí.</p>
                  {/* <p className='leyenda'>Se debe subir un escáner del formato de antecedentes. <b>Debe ser el archivo en formato .pdf</b></p> */}
                  <Row>
                     <InputTextField
                        {...register("file", {})} //required: true
                        type="file" accept=".pdf" error={errors.correo} />
                  </Row>
               </Card>
               <BottonSubmit />
            </Form>

            {loading && <LoadingSpinner />}
            <Toaster />
            {redirect && <Navigate to={RouterLinks.HistoriaClinica} />}
         </Container>
      </div >
   );
};

export default Antecedentes;