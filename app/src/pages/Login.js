import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import InputTextField from '../components/InputTextField';
import LoadingSpinner from '../components/LoadingSpinner';
import { Images } from '../constants/Images';
import { RouterLinks } from '../constants/RouterLinks';
import { useApi } from '../hooks/useApi';
import { toast, Toaster } from 'react-hot-toast';
import '../styles/css/Login.css';
import { useAuthContext } from '../context/authContext';

const initialForm = {
   method: 'get',
   url: '/login',
   auth: {
      correo: '',
      password: ''
   }
}

const Login = () => {

   const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { login } = useAuthContext();

   const { loading, responseApi, api_handleSubmit } = useApi();

   const onSubmit = (data) => {
      
      api_handleSubmit(data)
         .then(({ data }) => {
            storageData(data);
         })
         .catch(() => {
            alertaError(responseApi);
         })
      // setData(res.data);
   };

   const storageData = (data) => {
      localStorage.setItem('id', data.id)
      localStorage.setItem('nombre', data.nombre.toUpperCase())
      localStorage.setItem('apellido', data.apellido.toUpperCase())
      localStorage.setItem('token', data.token)
      login();
   }

   const alertaError = (menssage) => {
      toast.error(menssage, {
         duration: 7000,
         position: 'top-center'
      })
   }

   useEffect(() => {

   }, [])

   return (
      <div className='Login'>

         <Card>
            <div className='logos'>
               <img src={Images.logo_icbf} alt="" />
               <img src={Images.logo_sbfb} alt="" />
            </div>
            <Card.Title>Iniciar Sesión</Card.Title>
            <Card.Body>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                     <Col>
                        <InputTextField
                           {...register("auth.correo", {
                              required: true,
                              pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
                           })}
                           type="email" label="Correo electrónico" placeholder="name@example.com" error={errors.correo} />
                        <InputTextField
                           {...register("auth.password", {
                              required: true
                           })}
                           type="password" label="Contraseña" placeholder="************" error={errors.password} />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Button className='bn-login' variant="success" type="submit">Iniciar sesión</Button>
                     </Col>
                  </Row>
               </form>
            </Card.Body>
            <Link to={RouterLinks.Registrarse}>Registrarse</Link>
         </Card>

         {loading && <LoadingSpinner />}
         <Toaster />
      </div>
   );
};

export default Login;

//