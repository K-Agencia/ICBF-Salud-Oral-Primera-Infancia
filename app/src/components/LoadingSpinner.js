import React from 'react';
import { RingLoader } from 'react-spinners';
import '../styles/css/LoadingSpinner.css';

const LoadingSpinner = ({loading}) => {
   return (
      <div className='LoadingSpinner Overlay'>
         <RingLoader
            color={'#9acd32'}
            loading={true}
            cssOverride={''}
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
         />
         <h5>Cargando...</h5>
      </div>
   );
};

export default LoadingSpinner;