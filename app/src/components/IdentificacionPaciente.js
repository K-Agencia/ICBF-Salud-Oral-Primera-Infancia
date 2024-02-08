import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { RouterLinks } from '../constants/RouterLinks';
import '../styles/css/IdentificacionPaciente.css';

const cookies = new Cookies();

const IdentificacionPaciente = () => {

   return (
      <div className='IdentificacionPaciente'>
         <Container className='mt-5'>
            <Row>
               <Col className='button-home' xs={2}>
                  <Link to={window.location.pathname !== RouterLinks.HistoriaClinica ? RouterLinks.HistoriaClinica : RouterLinks.Home}>
                     <Button variant='primary'>
                        <AiOutlineHome />
                     </Button>
                  </Link>
               </Col>
               <Col xs={10}>
                  <Card>
                     <h3>{`${cookies.get('nombre').toUpperCase()} ${cookies.get('apellidos').toUpperCase()}`}</h3>
                     <h6>{`No. Documento: ${cookies.get('noDocumento')}`}</h6>
                  </Card>
               </Col>
            </Row>
         </Container>
      </div>
   );
};

export default IdentificacionPaciente;