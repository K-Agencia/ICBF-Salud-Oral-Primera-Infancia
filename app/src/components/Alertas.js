import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Alertas = ({ tipo, menssage }) => {

   useEffect(() => {
      toast["error"]("menssage", {
         duration: 7000,
         position: 'top-center'
      })
   }, [])

   return (
      <Toaster />
   );
};

export default Alertas;