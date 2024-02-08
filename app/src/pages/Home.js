import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import { AiOutlineEdit, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { RouterLinks } from '../constants/RouterLinks';
import { useApi } from '../hooks/useApi';
import Cookies from 'universal-cookie';

import '../styles/css/Home.css';
import TituloPaginas from '../components/TituloPaginas';

const cookies = new Cookies();

const Home = () => {

   const { loading, api_handleSubmit } = useApi();
   const [data, setData] = useState([]);

   const get_data = async () => {
      const response = await api_handleSubmit({
         method: 'get',
         url: '/listaPacientes'
      })
      setData(response.data);
   }

   const onRedirect = (id) => {
      localStorage.setItem('idPaciente', id.id);
      cookies.set('noDocumento', id.noDocumentos)
      cookies.set('nombre', id.nombres)
      cookies.set('apellidos', id.apellidos)
      window.location.href = RouterLinks.HistoriaClinica;
   }

   useEffect(() => {
      localStorage.removeItem('idPaciente');
      cookies.remove('noDocumento')
      cookies.remove('nombre')
      cookies.remove('apellidos')
      cookies.remove('menssage')
      cookies.remove('tipoDocumento')
      get_data();
   }, []);

   return (
      <div className='Home'>

         <Container>
            <TituloPaginas titulo={"Listado de pacientes"} />
            <Row className='my-5'>
               <Col xs={12} sm={2} className="d-grid gap-2">
                  <Link to={RouterLinks.InformacionPersonal}>
                     <Button className='btn-add'>Añadir <AiOutlineUserAdd /></Button>
                  </Link>
               </Col>
            </Row>
            <Card>
               <Table striped>
                  <thead>
                     <tr>
                        <th></th>
                        <th>Número de documento</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Acciones</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((item, index) => (
                        <tr key={index}>
                           <td>{index + 1}</td>
                           <td>{item.noDocumentos}</td>
                           <td>{item.nombres}</td>
                           <td>{item.apellidos}</td>
                           <td><Button className='history' onClick={() => onRedirect(item)}><AiOutlineEdit /></Button></td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            </Card>
         </Container>

         {loading && <LoadingSpinner />}
         <Toaster />
      </div>
   );
};

export default Home;