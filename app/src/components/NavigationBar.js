import React, { useEffect, useState } from 'react';
import logoIcbf from '../styles/images/logoICBF.svg';
import logoFB from '../styles/images/logoFuturosBrillantes.svg';
import Cookies from 'universal-cookie';
import { AiOutlinePoweroff } from 'react-icons/ai';

import '../styles/css/NavigationBar.css';

import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { RouterLinks } from '../constants/RouterLinks';
import { useAuthContext } from '../context/authContext';

const cookies = new Cookies();

const NavigationBar = () => {

   const { logout } = useAuthContext();

   const [navBar, setNavBar] = useState(false);

   const cerrarsesion = () => {
      cookies.remove('url');
      cookies.remove('noDocumento');
      cookies.remove('tipoDocumento');
      cookies.remove('apellidos');
      cookies.remove('nombre');
      
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('idPaciente');
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      logout();
      
   }

   useEffect(() => {
      if (localStorage.getItem('token')) {
         setNavBar(true)
      }
   }, [navBar]);

   return (
      <Navbar bg="success" variant="light" className='NavigationBar'>
         <Container>
            <Navbar.Brand href={RouterLinks.Home}>
               <div>
                  <img src={logoIcbf} alt="" />
                  <img src={logoFB} alt="" />
               </div>
            </Navbar.Brand>
            <Nav className="">
               <Button variant='danger' className='btn-sesion' onClick={() => cerrarsesion()}><AiOutlinePoweroff /></Button>
            </Nav>
         </Container>
      </Navbar>
   );
};

export default NavigationBar;