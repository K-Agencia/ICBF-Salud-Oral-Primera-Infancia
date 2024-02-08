import React from 'react';
import { Form } from 'react-bootstrap';
import '../styles/css/InputTextField.css';

const InputTextField = React.forwardRef(({ onChange, onBlur, name, label, type, placeholder, accept, disabled, readOnly, plaintext, defaultValue }, ref) => {
   return (
      <Form.Group className="InputTextField mb-0" controlId={`${label}`}>
         {label && <Form.Label>{label}</Form.Label>}
         <Form.Control
            ref={ref}
            name={name}
            type={type}
            placeholder={placeholder && placeholder}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={type === 'password' ? "false" : "true"}
            disabled={disabled}
            readOnly={readOnly}
            defaultValue={defaultValue === undefined ? "" : defaultValue}
            plaintext={plaintext}
            accept={accept}
         />
         {/* <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback> */}
      </Form.Group>
   );
});

export default InputTextField;
//({ type, label, placeholder, error })
