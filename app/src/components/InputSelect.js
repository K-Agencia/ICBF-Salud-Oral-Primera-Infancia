import React from 'react';
import { Form } from 'react-bootstrap';

const InputSelect = React.forwardRef(({ onChange, onBlur, name, label, options, otro }, ref) => {

   return (
      <div className='InputSelect mb-2'>
         <Form.Group controlId={`${label}`}>
            <Form.Label>{label}</Form.Label>
            <Form.Select name={name} ref={ref} onChange={onChange} onBlur={onBlur} defaultValue="0" disabled={options.length === 0 ? true : false}>
               <option disabled value="0">Seleccione una opción</option>
               {options.map((item, index) => (
                  <option key={index} value={item.id_departamentos || item.id_municipios || item.id_eps || item.id_opcion}>
                     {item.departamentos || item.municipios || item.eps || item.option}
                  </option>
               ))}
               {otro === true && <option value="otro">Otro...</option>}
            </Form.Select>
         </Form.Group>
      </div>
   );
});

export default InputSelect;