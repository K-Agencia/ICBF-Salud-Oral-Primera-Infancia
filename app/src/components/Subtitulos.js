import React from 'react';
import '../styles/css/Subtitulos.css';

const Subtitulos = ({ subtitulo }) => {
   return (
      <div className='Subtitulos'>
         <h5>{subtitulo}</h5>
      </div>
   );
};

export default Subtitulos;