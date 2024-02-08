import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const InputTextGroup = React.forwardRef(({ onChange, onBlur, name, label, type, placeholder, sufijo, readOnly, defaultValue }, ref) => {
   return (
      <>
         {label && <Form.Label>{label}</Form.Label>}
         <InputGroup className="mb-0">
            <Form.Control
               ref={ref}
               name={name}
               type={type}
               placeholder={placeholder}
               onChange={onChange}
               onBlur={onBlur}
               defaultValue={defaultValue === undefined ? "" : defaultValue}
               readOnly={readOnly}
            />
            <InputGroup.Text id="basic-addon2">{sufijo}</InputGroup.Text>
         </InputGroup>
      </>
   );
});

export default InputTextGroup;