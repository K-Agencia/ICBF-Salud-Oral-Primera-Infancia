import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import InputTextField from '../components/InputTextField';
import LoadingSpinner from '../components/LoadingSpinner';
import { Images } from '../constants/Images';
import { RouterLinks } from '../constants/RouterLinks';
import { useApi } from '../hooks/useApi';
import '../styles/css/Login.css';

const initialForm = {
   method: 'post',
   url: '/registrarse',
   nombre: "",
   apellido: "",
   institucion: "",
   correo: "",
   password: ""
}

const Registrarse = () => {

   const { register, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, responseApi, api_handleSubmit } = useApi();
   const [redirect, setRedirect] = useState(false);

   const onSubmit = (data) => {
      api_handleSubmit(data);
   };

   const alertas = (tipo, menssage) => {
      if(tipo !== "error"){
         
         toast.loading("Redireccionando a la para Iniciar Sesión", {
            duration: 5000,
            position: 'top-center'
         })
         
         toast.success(menssage, {
            duration: 5000,
            position: 'top-center'
         })
         
         setTimeout(() => {
            setRedirect(true)
         }, 5000);
         
      }else{
         toast.error(menssage, {
            duration: 7000,
            position: 'top-center'
         })
      }
   }

   useEffect(() => {
      if (responseApi !== undefined) {
         if (responseApi.status === 200) {
            alertas("sucess", responseApi.data);
         } else {
            alertas("error", responseApi);
         }
      }
   }, [responseApi])

   return (
      <div className='Registrarse'>
         <Card>
            <div className='logos'>
               <img src={Images.logo_icbf} alt="" />
               <img src={Images.logo_sbfb} alt="" />
            </div>
            <Card.Title>Registrarse</Card.Title>
            <Card.Body>
               <Form onSubmit={handleSubmit(onSubmit)}>
                  <InputTextField
                     {...register("nombre", {
                        required: true,
                        maxLength: 45
                     })}
                     type="text" label="Nombres" placeholder="Nombre" error={""} />

                  <InputTextField
                     {...register("apellido", {
                        required: true,
                        maxLength: 45
                     })}
                     type="text" label="Apellidos" placeholder="Apellido" error={""} />

                  <InputTextField
                     {...register("institucion", {
                        required: true,
                        maxLength: 80
                     })}
                     type="text" label="Institución Educativa" placeholder="Institución Educativa" error={""} />

                  <InputTextField
                     {...register("correo", {
                        required: true,
                        maxLength: 80
                     })}
                     type="email" label="Correo electrónico" placeholder="nombre@ejemplo.com" error={""} />

                  <InputTextField
                     {...register("password", {
                        required: true
                     })}
                     type="password" label="Contraseña" placeholder="************" error={""} />

                  <Button variant="success" type="submit">Registrarse</Button>
               </Form>
            </Card.Body>
            <Link to={RouterLinks.Login}>Iniciar Sesión</Link>
         </Card>

         {loading && <LoadingSpinner />}
         <Toaster />
         {redirect && <Navigate to={RouterLinks.Login}/>}
      </div>
   );
};

export default Registrarse;