import React from 'react';
import { Form } from 'react-bootstrap';

import '../styles/css/InputCheck.css';

const InputCheck = React.forwardRef(({ onChange, onBlur, name, label, options, type }, ref) => {
   return (
      <div className='InputCheck'>
         {options.map((item, index) => (
            <div key={index}>
               <Form.Check ref={ref} inline label={item.label} value={item.label} name={name} type={type} onChange={onChange} onBlur={onBlur} />
               {item.descripcion && item.descripcion.map((list) => (
                  <ul key={index}>
                     <li>{list}</li>
                  </ul>
               ))}
            </div>
         ))}
      </div>
   );
});

export default InputCheck;