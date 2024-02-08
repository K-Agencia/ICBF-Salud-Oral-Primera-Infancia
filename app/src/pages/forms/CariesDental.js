import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Col, Container, Modal, Table, Accordion, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import BottonSubmit from '../../components/BottonSubmit';
import InputTextField from '../../components/InputTextField';
import LoadingSpinner from '../../components/LoadingSpinner';
import TituloPaginas from '../../components/TituloPaginas';
import WindowsModal from '../../components/WindowsModal';
import { ItemCariesDental } from '../../constants/ItemsCariesDental';
import { RouterLinks } from '../../constants/RouterLinks';
import { useApi } from '../../hooks/useApi';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import '../../styles/css/CariesDental.css';
import ObservacionDocente from '../../components/ObservacionDocente';
import IdentificacionPaciente from '../../components/IdentificacionPaciente';


const initialForm = {
   method: 'post',
   url: '/caries',
   dientes: {
      d_16: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_55: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_54: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_53: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_52: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_51: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_61: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_62: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_63: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_64: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_65: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_26: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_46: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_85: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_84: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_83: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_82: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_81: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_71: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_72: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_73: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_74: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_75: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      },
      d_36: {
         V: {
            con: "",
            car: ""
         },
         L: {
            con: "",
            car: ""
         },
         M: {
            con: "",
            car: ""
         },
         D: {
            con: "",
            car: ""
         },
         O: {
            con: "",
            car: ""
         }
      }
   },
   observacionesDocente: ""
}

const cookies = new Cookies();

const CariesDental = () => {

   const { register, setValue, formState: { errors }, getValues, watch, handleSubmit } = useForm({
      defaultValues: initialForm
   });

   const { loading, api_handleSubmit } = useApi();

   const dientesF1 = [16, 55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 26];
   const dientesF2 = [46, 85, 84, 83, 82, 81, 71, 72, 73, 74, 75, 36];

   const cariados = [20, 21, 40, 41, 60, 61];

   const [copd, setCopd] = useState({});
   const [tablas, setTablas] = useState({
      C: 0, O: 0, P: 0
   });

   const [redirect, setRedirect] = useState(false);

   const [show, setShow] = useState(false);
   const [active, setActive] = useState(false);

   const [data, setData] = useState({});

   const handleClose = () => setShow(false);

   const onModal = (data) => {
      setData(data);
      setActive(true)
   }

   const onChange = (e) => {

      const condicion = [0, 70, 80, 97, 99];
      const cariados = [0, 20, 21, 40, 41, 60, 61, 96];

      const { name, value } = e.target;
      let valor = value;

      let name_inp = name.split('.')[3]

      if (valor.length === 2) {
         if (name_inp === 'con') {
            if (!condicion.includes(parseInt(valor))) {
               valor = ''
            }
         } else {
            if (!cariados.includes(parseInt(valor))) {
               valor = ''
            }
         }
      }

      setValue(name, valor);
   }

   const onBlur = (e) => {
      let dientes = getValues().dientes;
      let nombre = e.target.name.split('_')[1].split('.')[0];
      let arr = dientes[`d_${nombre}`]
      let allArr = [];

      for (const property in arr) {
         if (!Number.isNaN(parseInt(arr[property].con))) { allArr.push(parseInt(arr[property].con)) }
         if (!Number.isNaN(parseInt(arr[property].car))) { allArr.push(parseInt(arr[property].car)) }
      }

      let numeros = allArr.sort((x, y) => x - y);
      let letra = "";

      if (numeros.find(e => e === 97)) {
         letra = 'e'
      } else if (numeros.find(e => e === 96)) {
         letra = 'P'
      } else if (numeros.find(e => cariados.includes(e))) {
         letra = 'C'
      } else if (numeros.find(e => e === 80)) {
         letra = 'O';
      } else if (numeros.find(e => e === 70) || (numeros.find(e => e === 0) + 1)) {
         letra = 'S'
      }

      setCopd({
         ...copd,
         [`d_${nombre}`]: letra
      })

   }

   const onSubmit = async (data) => {

      data['idPaciente'] = localStorage.getItem('idPaciente');
      handleClose();
      const res = await api_handleSubmit(data);

      if (res.status === 200) {
         cookies.set('menssage', res.data, { path: '/' });
         setRedirect(true);
      }
   }

   useEffect(() => {
      let arrletras = []

      for (const property in copd) {
         arrletras.push(copd[property])
      }

      const countLetras = {};

      for (let i = 0; i < arrletras.length; i++) {
         if (countLetras[arrletras[i]]) {
            countLetras[arrletras[i]]++;
         } else {
            countLetras[arrletras[i]] = 1;
         }
      }

      setTablas(countLetras);

   }, [copd]);

   return (
      <div className='CariesDental'>


         <Container>
            <IdentificacionPaciente />

            <TituloPaginas titulo="Examen Clínico De Caries Dental" />

            <Accordion className='mb-3'>
               <Accordion.Item eventKey="0" >
                  <Accordion.Header><AiOutlineInfoCircle className='infoButton' /> Guía de códigos y equivalencia</Accordion.Header>
                  <Accordion.Body>
                     <Row className='mt-2'>
                        <Col xs={12} sm={3}>

                           <Table className='table_leyenda COP-D' bordered>
                              <thead>
                                 <tr>
                                    <td colSpan={2} className="cabeceraTabla tituloTable">COP-D / ceo-D</td>
                                 </tr>
                                 <tr>
                                    <td className="cabeceraTabla subtituloTable">Código</td>
                                    <td className="cabeceraTabla subtituloTable">Definición</td>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>S</td>
                                    <td>Sano</td>
                                 </tr>
                                 <tr>
                                    <td>C</td>
                                    <td>Cariado</td>
                                 </tr>
                                 <tr>
                                    <td>O</td>
                                    <td>Obturado</td>
                                 </tr>
                                 <tr>
                                    <td>P <br /> e</td>
                                    <td>Perdido por caries <br /> Extraído por caries</td>
                                 </tr>
                              </tbody>
                           </Table>
                        </Col>

                        <Col xs={12} sm={4}>
                           <Table className='table_leyenda Con' bordered>
                              <thead>
                                 <tr>
                                    <td colSpan={2} className="cabeceraTabla tituloTable"><b>Con</b> - Condición de la superficie</td>
                                 </tr>
                                 <tr>
                                    <td className="cabeceraTabla subtituloTable">Código</td>
                                    <td className="cabeceraTabla subtituloTable">Definición</td>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>0</td>
                                    <td>Sano</td>
                                 </tr>
                                 <tr>
                                    <td>70</td>
                                    <td>Sellante</td>
                                 </tr>
                                 <tr>
                                    <td>80</td>
                                    <td>Obturación: Resina / Amalgama / IdeV 4ario</td>
                                 </tr>
                                 <tr>
                                    <td>97</td>
                                    <td>Ausente / Perdido por otra causa</td>
                                 </tr>
                              </tbody>
                           </Table>

                           <Table className='table_leyenda Con' bordered>
                              <thead>
                                 <tr>
                                    <td colSpan={2} className="cabeceraTabla tituloTable"><b>Con</b> - Condición del diente</td>
                                 </tr>
                                 <tr>
                                    <td className="cabeceraTabla subtituloTable">Código</td>
                                    <td className="cabeceraTabla subtituloTable">Definición</td>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>99</td>
                                    <td>Diente sin erupcionar</td>
                                 </tr>
                              </tbody>
                           </Table>
                        </Col>

                        <Col xs={12} sm={5}>
                           <Table className='table_leyenda Car' bordered>
                              <thead>
                                 <tr>
                                    <td colSpan={3} className="cabeceraTabla tituloTable"><b>Car</b> - Caries ICCMS a nivel de superficie simplificado</td>
                                 </tr>
                                 <tr>
                                    <td rowSpan={2} className="cabeceraTabla subtituloTable">Definición</td>
                                    <td colSpan={2} className="cabeceraTabla subtituloTable">Códigos con actividad</td>
                                 </tr>
                                 <tr>
                                    <td className="cabeceraTabla subtituloTable">Inactivo</td>
                                    <td className="cabeceraTabla subtituloTable">Activo</td>
                                 </tr>
                              </thead>
                              <tbody>
                                 <tr>
                                    <td>Sin cambios visuales</td>
                                    <td colSpan={2}>0</td>
                                 </tr>
                                 <tr>
                                    <td>Lesión inicial de caries: cambio visual en esmalte</td>
                                    <td>20</td>
                                    <td>21</td>
                                 </tr>
                                 <tr>
                                    <td>Lesión moderada de caries</td>
                                    <td>40</td>
                                    <td>41</td>
                                 </tr>
                                 <tr>
                                    <td>Lesión extensa o severa de caries</td>
                                    <td>60</td>
                                    <td>61</td>
                                 </tr>
                                 <tr>
                                    <td>Perdido por caries</td>
                                    <td colSpan={2}>96</td>
                                 </tr>
                              </tbody>
                           </Table>
                        </Col>
                     </Row>
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion>

            <Form onSubmit={handleSubmit(onModal)}>
               <Card>
                  <div className="card_tables">
                     <Table bordered className='table_info_copd'>
                        <thead>
                           <tr>
                              <td className='sticky'>
                              </td>
                              {dientesF1.map((diente, index) => (
                                 <td key={index} colSpan={2}>{diente}</td>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>COP-D</td>
                              {dientesF1.map((diente, index) => (
                                 <td className="letraTable" key={index} colSpan={2}>{copd[`d_${diente}`]}</td>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>C sup.</td>
                              {dientesF1.map((diente, index) => (
                                 <>
                                    <td key={index}>Con</td>
                                    <td key={index + 1}>Car</td>
                                 </>
                              ))
                              }
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='sticky'>O</td>
                              {ItemCariesDental.fila1.O.map((diente, index) => {

                                 if (diente !== 'dd') {
                                    return (
                                       <td key={index} className={""}>
                                          <InputTextField
                                             {...register(`dientes.${diente}`, {})} //required: true
                                             onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                       </td>
                                    )
                                 } else {
                                    return (
                                       <td className='nullCell'></td>
                                    )
                                 }
                              })
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>M</td>
                              {ItemCariesDental.fila1.M.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>D</td>
                              {ItemCariesDental.fila1.D.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>V</td>
                              {ItemCariesDental.fila1.V.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>P</td>
                              {ItemCariesDental.fila1.P.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                        </tbody>
                     </Table>
                  </div>
               </Card>

               <br />

               <Card>
                  <div className="card_tables">
                     <Table bordered className='table_info_copd'>
                        <thead>
                           <tr>
                              <td className='sticky'>
                              </td>
                              {dientesF2.map((diente, index) => (
                                 <td key={index} colSpan={2}>{diente}</td>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>COP-D</td>
                              {dientesF2.map((diente, index) => (
                                 <td className="letraTable" key={index} colSpan={2}>{copd[`d_${diente}`]}</td>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>C sup.</td>
                              {dientesF2.map((diente, index) => (
                                 <>
                                    <td key={index}>Con</td>
                                    <td key={index + 1}>Car</td>
                                 </>
                              ))
                              }
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='sticky'>O</td>
                              {ItemCariesDental.fila2.O.map((diente, index) => {

                                 if (diente !== 'dd') {
                                    return (
                                       <td key={index} className={""}>
                                          <InputTextField
                                             {...register(`dientes.${diente}`, { pattern: /^(0|70|80|97|99)$/ })} //required: true
                                             onBlur={onBlur} type="number" error={errors.correo} />
                                       </td>
                                    )
                                 } else {
                                    return (
                                       <td className='nullCell'></td>
                                    )
                                 }
                              })
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>M</td>
                              {ItemCariesDental.fila2.M.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>D</td>
                              {ItemCariesDental.fila2.D.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>V</td>
                              {ItemCariesDental.fila2.V.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                           <tr>
                              <td className='sticky'>L</td>
                              {ItemCariesDental.fila2.L.map((diente, index) => (
                                 <>
                                    <td key={index} className={""}>
                                       <InputTextField
                                          {...register(`dientes.${diente}`, {})} //required: true
                                          onChange={onChange} onBlur={onBlur} type="number" error={errors.correo} />
                                    </td>
                                 </>
                              ))
                              }
                           </tr>
                        </tbody>
                     </Table>
                  </div>
               </Card>

               <br />

               <Card className='card-copd'>
                  <h5>ceo-D</h5>
                  <hr />
                  <Col xs={12}>
                     <Table bordered>
                        <thead>
                           <tr>
                              <td colSpan={2}><b>Condiciones</b></td>
                              <td><b>Dientes</b></td>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className="tipo_condicion" colSpan={2}>Total evaluados</td>
                              <td>{
                                 (tablas.C === undefined ? 0 : tablas.C) +
                                 (tablas.P === undefined ? 0 : tablas.P) +
                                 (tablas.O === undefined ? 0 : tablas.O)
                              }</td>
                           </tr>
                           <tr>
                              <td>c</td>
                              <td className="tipo_condicion">Cariados</td>
                              <td>{tablas.C === undefined ? 0 : tablas.C}</td>
                           </tr>
                           <tr>
                              <td>e</td>
                              <td className="tipo_condicion">Extraído por caries</td>
                              <td>{tablas.P === undefined ? 0 : tablas.P}</td>
                           </tr>
                           <tr>
                              <td>o</td>
                              <td className="tipo_condicion">Obturados</td>
                              <td>{tablas.O === undefined ? 0 : tablas.O}</td>
                           </tr>
                        </tbody>
                     </Table>
                  </Col>
               </Card>

               <br />
               <Card>
                  <ObservacionDocente  {...register(`observacionesDocente`, {})} />
               </Card>

               <BottonSubmit disable={watch(`observacionesDocente`) === "" && true} />

               <Modal centered show={active} onHide={handleClose}>
                  <Modal.Header closeButton>
                     <Modal.Title>¡Advertencia!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     Una vez usted oprima el botón de <b>Guardar</b>, la información que usted suministró no podrá ser editada después. <br />
                     Si es necesario, revise los datos registrados antes de guardar.
                  </Modal.Body>
                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                     </Button>
                     <Button variant="primary" onClick={() => onSubmit(data)}>
                        Guardar
                     </Button>
                  </Modal.Footer>
               </Modal>

            </Form>

         </Container>

         {loading && <LoadingSpinner />}
         <Toaster />
         {redirect && <Navigate to={RouterLinks.HistoriaClinica} />}

         <WindowsModal show={show} handleClose={handleClose} />
      </div>
   );
};

export default CariesDental;