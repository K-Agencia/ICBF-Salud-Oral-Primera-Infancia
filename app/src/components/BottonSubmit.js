import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { RouterLinks } from '../constants/RouterLinks';
import '../styles/css/BottonSubmit.css';

const BottonSubmit = ({ disable, types, handleClick }) => {

   const [redirect, setRedirect] = useState(false);

   return (
      <Row className='BottonSubmit'>
         <Col xs={12} sm={6} className="btns">
            <Button className='mb-2' variant="outline-secondary" onClick={() => setRedirect(true)}>Cancelar</Button>
            {types === false ?
               <Button className='mb-2' disabled={disable} variant="success" onClick={() => handleClick()}>Guardar</Button>
               :
               <Button className='mb-2' disabled={disable} variant="success" type={"submit"}>Guardar</Button>
            }
            {redirect && <Navigate to={window.location.pathname !== RouterLinks.InformacionPersonal ? RouterLinks.HistoriaClinica : RouterLinks.Home} />}
         </Col>
      </Row>
   );
};

export default BottonSubmit;