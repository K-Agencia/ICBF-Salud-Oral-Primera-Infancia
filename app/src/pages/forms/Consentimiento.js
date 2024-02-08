import React, { useEffect, useState } from 'react';
import { Card, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit';
import IdentificacionPaciente from '../../components/IdentificacionPaciente';
import InputTextField from '../../components/InputTextField';
import LoadingSpinner from '../../components/LoadingSpinner';

import TituloPaginas from '../../components/TituloPaginas';
import { RouterLinks } from '../../constants/RouterLinks';
import { useApi } from '../../hooks/useApi';

import '../../styles/css/Consentimiento.css';

const initialForm = {
   method: 'post',
   url: '/consentimiento',
   file: ''
}

const cookies = new Cookies();

const Consentimiento = () => {

   const { register, formState: { errors }, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, responseApi, api_handleSubmit } = useApi();
   const [redirect, setRedirect] = useState(false);
   const [resolve, setResolve] = useState(undefined);

   const onSubmit = async (data) => {
 
      const formData = new FormData();

      formData.append('file', data.file[0]);
      formData.append('data', JSON.stringify({ idPaciente: localStorage.getItem('idPaciente') }));

      const res = await api_handleSubmit(data, formData);

      if (res.status === 200) {
         cookies.set('url', RouterLinks.Consentimiento, { path: '/' });
         cookies.set('menssage', res.data, { path: '/' });
         setRedirect(true);
      } else {
         setResolve(false)
      }
   }

   const alertaError = (menssage) => {
      toast.error(menssage, {
         duration: 7000,
         position: 'top-center'
      })
   }

   useEffect(() => {
      if (cookies.get('url') === RouterLinks.InformacionPersonal) {
         toast.success(cookies.get("menssage"), {
            duration: 7000,
            position: 'top-center'
         })
         cookies.remove('url')
         cookies.remove('menssage')
      }

      if (resolve === false) {
         alertaError(responseApi);
         setResolve(undefined)
      }
   }, [resolve]);

   return (
      <div className='Consentimiento'>

         <Container>
            <IdentificacionPaciente />

            <TituloPaginas titulo="Autorización por parte del padre de familia" />

            <Form onSubmit={handleSubmit(onSubmit)}>
               <Card>
                  <p className='leyenda'>Se debe añadir el documento de autorización firmado por el padre de familia. <b>El archivo debe ser en formato PDF </b><i>(.pdf)</i></p>
                  <Row>
                     <InputTextField
                        {...register("file", {})} //required: true
                        type="file" error={errors.correo} accept=".pdf" />
                  </Row>
               </Card>
               <BottonSubmit />
            </Form>

         </Container>
         {loading && <LoadingSpinner />}
         <Toaster />
         {redirect && <Navigate to={RouterLinks.Antecedentes} />}
      </div>
   );
};

export default Consentimiento;