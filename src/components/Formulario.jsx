import React,{useState, Fragment} from 'react';
import Tabla from './Tabla';
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

export default function Formularios() {

  const [persona, setPersona] = useState([]);

  const getMensaje = (nombre, edad, ocupacion) => {
    let momento;
    let valores;
    if(edad >= 0 && edad <= 12) {
      momento = "Niño";
      valores = "Respeto, Obediencia y Responsabilidad";
    } else if (edad >= 13 && edad <= 30) {
      momento = "Jóven";
      valores = "Compromiso, Esfuerzo y Respeto";
    } else if (edad >= 31 && edad <= 50) {
      momento = "Adulto";
      valores = "Perdón, Humildad y Empatía";
    } else if (edad >= 51) {
      momento = "Mayor";
      valores = "Amor, Tenacidad y Paciencia";
    }
    const mensaje = `Al ${ momento} ${nombre} de ${edad} años de edad le 
        recomendamos tener presente el ${valores} como principales valores
        para obtener un buen resultado como ${ocupacion}`;
    return mensaje;
  }

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    data.mensaje= getMensaje(data.nombre, data.edad, data.ocupacion);
    setPersona((persona) => [...persona, data]);
    e.target.reset()
  };

  return (
    <>
      <h2>Formulario</h2>
      <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Nombre</label>
          <input
            type="text" 
            className="form-control my-2"
            {...register("nombre", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          {errors.nombre?.type === 'required' && <span className="text-danger text-small d-block mb-2">Nombre es requerido</span>}
          {errors.nombre?.type === 'pattern' && <span className="text-danger text-small d-block mb-2">Nombre no acepta numeros</span>}

          <label>Edad</label>
          <input type="number"
            className="form-control my-2"
            {...register("edad", { required: true, min: 0 })}

          />
          {errors.edad?.type === 'required' && <span className="text-danger text-small d-block mb-2">Edad es requerido</span>}
          {errors.edad?.type === 'min' && <span className="text-danger text-small d-block mb-2">Edad debe ser mayoy a 0</span>}


          <label>Email</label>
          <input
            type="text"
            className="form-control my-2"
            {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/})}
          />
          {errors.email?.type === 'required' && <span className="text-danger text-small d-block mb-2">Email es requerido</span>}
          {errors.email?.type === 'pattern' && <span className="text-danger text-small d-block mb-2">Debe ingresar un email válido</span>}


          <label>Ocupacion</label>
          <select {...register("ocupacion")}
            className="form-select my-2">
            <option value="estudiante">estudiante</option>
            <option value="empleado">empleado</option>
            <option value="jubilado">jubilado</option>
          </select>

          <button
            className="btn btn-primary my-2">
            Guardar Persona</button>
        </form>
      </Fragment>
      <Tabla data={persona}/>
    </>
  
  );
}
