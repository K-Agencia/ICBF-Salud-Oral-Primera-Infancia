import React from 'react';
import '../styles/css/TituloPaginas.css';

const TituloPaginas = ({ titulo }) => {
   return (
      <div className='TituloPaginas'>
         <h1>{titulo}</h1>
      </div>
   );
};

export default TituloPaginas;