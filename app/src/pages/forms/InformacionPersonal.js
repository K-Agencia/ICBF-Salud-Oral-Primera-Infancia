import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit';
import InputSelect from '../../components/InputSelect';
import InputTextField from '../../components/InputTextField';
import LoadingSpinner from '../../components/LoadingSpinner';

import Subtitulos from '../../components/Subtitulos';
import TituloPaginas from '../../components/TituloPaginas';
import { Departamentos } from '../../constants/Departamentos';
import { EPS } from '../../constants/Eps';
import { RouterLinks } from '../../constants/RouterLinks';
import { useApi } from '../../hooks/useApi';
import '../../styles/css/InformacionPersonal.css';

const initialForm = {
   method: 'post',
   url: '/insertarPaciente',
   paciente: {
      identificacion: {
         tipo: "",
         numero: ""
      },
      nombre: "",
      apellido: "",
      nacimiento: {
         fecha: "",
         municipio: "1"
      },
      residencia: {
         direccion: "",
         municipio: "1",
         barrio: ""
      },
      eps: {
         id: 0,
         nombre: "",
         regimen: ""
      }
   },
   escuela: {
      municipio: "1",
      nombre: ""
   },
   acudiente: {
      identificacion: {
         tipo: "",
         numero: ""
      },
      nombre: "",
      apellido: "",
      telefono: "",
      parentesco: ""
   }
};

const cookies = new Cookies();

const InformacionPersonal = () => {

   const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: initialForm
   });
   const { loading, responseApi, api_handleSubmit } = useApi();

   const [municipios, setmunicipios] = useState({
      escuelas: [],
      nacimiento: [],
      residencia: []
   });
   const [redirect, setRedirect] = useState(false);
   const [resolve, setResolve] = useState(undefined);

   const get_data = async (obj) => {
      return await api_handleSubmit(obj)
   }

   const getMuniciipos = async (tipo, id_departamentos) => {
      const response = await get_data({
         method: 'get',
         url: '/municipios',
         params: {
            id: id_departamentos
         }
      })

      setmunicipios({
         ...municipios,
         [tipo]: response.data
      })
   }

   const alertaError = (menssage) => {
      toast.error(menssage, {
         duration: 7000,
         position: 'top-center'
      })
   }

   const onSubmit = async (data) => {

      const res = await api_handleSubmit(data);

      if (res.status === 200) {
         localStorage.setItem('idPaciente', res.data.id_paciente);
         cookies.set('url', RouterLinks.InformacionPersonal, { path: '/' });
         cookies.set('menssage', res.data.message, { path: '/' });

         cookies.set('noDocumento', data.paciente.identificacion.numero, { path: '/' })
         cookies.set('nombre', data.paciente.nombre, { path: '/' })
         cookies.set('apellidos', data.paciente.apellido, { path: '/' })
         cookies.set('tipoDocumento', data.paciente.identificacion.tipo, { path: '/' })
         
         setRedirect(true);
      } else {
         setResolve(false)
      }
   }

   useEffect(() => {
      if (resolve === false) {
         alertaError(responseApi);
         setResolve(undefined)
      }
   }, [resolve]);

   return (
      <div className='InformacionPersonal'>
         

         <Container>
            <TituloPaginas titulo="Información Personal del Paciente" />

            <Form onSubmit={handleSubmit(onSubmit)}>
               <Card className='mb-3'>
                  <Subtitulos subtitulo={"Información del jardín"} />
                  <Row>
                     <Col xs={12} md={4} className="">
                        <InputSelect
                           onChange={e => getMuniciipos("escuelas", e.target.value)}
                           label="Departamento"
                           options={Departamentos}
                        />
                     </Col>
                     <Col xs={12} md={4} className="">
                        <InputSelect
                           {...register("escuela.municipio", {})} //required: true
                           label="Municipio"
                           options={municipios.escuelas}
                        />
                     </Col>
                     <Col xs={12} md={4} className="">
                        <InputTextField
                           {...register("escuela.nombre", {})} //required: true
                           type="text" label="Nombre" placeholder="Nombre del jardín" error={errors.correo} />
                     </Col>
                  </Row>
               </Card>

               <Card className='mb-3'>
                  <Subtitulos subtitulo={"Información Personal"} />
                  <Row className='my-2'>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           {...register("paciente.identificacion.tipo", {})} //required: true
                           label="Tipo de documento"
                           options={[
                              { id_opcion: "RC", option: "Registro civil de nacimiento" },
                              { id_opcion: "TI", option: "Tarjeta de identidad" },
                              { id_opcion: "PA", option: "Pasaporte" }
                           ]}
                        />

                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("paciente.identificacion.numero", {})} //required: true
                           type="number" label="Número de documento" placeholder="Número de documento" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("paciente.nombre", {})} //required: true
                           type="text" label="Nombres" placeholder="Nombres del paciente" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("paciente.apellido", {})} //required: true
                           type="text" label="Apellidos" placeholder="Apellidos del paciente" error={errors.correo} />
                     </Col>
                  </Row>

                  <hr />

                  <Subtitulos subtitulo={"Información de nacimiento"} />
                  <Row className='my-2'>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("paciente.nacimiento.fecha", {})} //required: true
                           type="date" label="Fecha de nacimiento" placeholder="Apellidos del paciente" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           onChange={e => getMuniciipos("nacimiento", e.target.value)}
                           label="Departamento"
                           options={Departamentos}
                        />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           {...register("paciente.nacimiento.municipio", {})} //required: true
                           label="Municipio"
                           options={municipios.nacimiento}
                        />
                     </Col>
                  </Row>

                  <hr />

                  <Subtitulos subtitulo={"Información de residencia"} />
                  <Row className='my-2'>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("paciente.residencia.direccion", {})} //required: true
                           type="text" label="Dirección de residencia" placeholder="Dirección de residencia" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           onChange={e => getMuniciipos("residencia", e.target.value)}
                           label="Departamento"
                           options={Departamentos}
                        />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           {...register("paciente.residencia.municipio", {})} //required: true
                           label="Municipio"
                           options={municipios.residencia}
                        />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("paciente.residencia.barrio", {})} //required: true
                           type="text" label="Barrio de residencia" placeholder="Barrio de residencia" error={errors.correo} />
                     </Col>
                  </Row>
                  <hr />
                  <Subtitulos subtitulo={"Información E.P.S."} />
                  <Row>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           {...register("paciente.eps.id", {})} //required: true
                           label="E.P.S."
                           options={EPS}
                        />
                     </Col>
                  </Row>
               </Card>

               <Card className='mb-3'>
                  <Subtitulos subtitulo={"Información del acudiente"} />
                  <Row>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           {...register("acudiente.identificacion.tipo", {})} //required: true
                           label="Tipo de documento"
                           options={[
                              { id_opcion: "CC", option: "Cédula de ciudadanía" },
                              { id_opcion: "CE", option: "Cédula de extranjeria" },
                              { id_opcion: "PA", option: "Pasaporte" }
                           ]}
                        />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("acudiente.identificacion.numero", {})} //required: true
                           type="number" label="Número de documento" placeholder="Número de documento" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("acudiente.nombre", {})} //required: true
                           type="text" label="Nombres" placeholder="Nombres del acudiente" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("acudiente.apellido", {})} //required: true
                           type="text" label="Apellidos" placeholder="Apellidos del acudiente" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputTextField
                           {...register("acudiente.telefono", {})} //required: true
                           type="number" label="Teléfono de contacto" placeholder="Apellidos del acudiente" error={errors.correo} />
                     </Col>
                     <Col xs={12} md={3} className="">
                        <InputSelect
                           {...register("acudiente.parentesco", {})} //required: true
                           label="Parentesco"
                           options={[
                              { id_opcion: "Madre/Padre", option: "Madre/Padre" },
                              { id_opcion: "Hermana/Hermano", option: "Hermana/Hermano" },
                              { id_opcion: "Abuela/Abuelo", option: "Abuela/Abuelo" },
                              { id_opcion: "Tía/Tío", option: "Tía/Tío" },
                              { id_opcion: "Prima/Primo", option: "Prima/Primo" },
                              { id_opcion: "Representante Legal", option: "Representante Legal" },
                           ]}
                        />
                     </Col>
                  </Row>
               </Card>
               <BottonSubmit />
            </Form>

            {loading && <LoadingSpinner />}
            <Toaster />
            {redirect && <Navigate to={RouterLinks.Consentimiento} />}
         </Container>
      </div>
   );
};

export default InformacionPersonal;