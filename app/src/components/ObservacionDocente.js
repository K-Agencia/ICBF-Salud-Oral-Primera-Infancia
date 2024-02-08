import React from 'react';
import { Form } from 'react-bootstrap';

const ObservacionDocente = React.forwardRef(({ onChange, onBlur, name }, ref) => {
   return (
      <div className='ObservacionDocente'>
         <h5>Observaciones del docente:</h5>
         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Este espacio es exclusivo para que el docente encargado anote las respectivas observaciones, en caso de que se requiera:</Form.Label>
            <Form.Control ref={ref} name={name} onChange={onChange} onBlur={onBlur} as="textarea" rows={3} />
         </Form.Group>
      </div>
   );
});

export default ObservacionDocente;