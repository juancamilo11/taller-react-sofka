import React from "react";

const Tabla = ({data}) => {
   return (
      <div>
         <h3>Tabla de Personas</h3>
         <table>
            <thead>
               <tr>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Email</th>
                  <th>Ocupación</th>
                  <th>Mensaje</th>
               </tr>
            </thead>
            <tbody>
               {data.length > 0 ? (
                  data.map((el) => (
                    <tr key={el.id}>
                        <td>{el.nombre}</td>
                        <td>{el.edad}</td>
                        <td>{el.email}</td>
                        <td>{el.ocupacion}</td>
                        <td>{el.mensaje}</td>
                    </tr>
                  ))
               ) : (
                  <tr>
                     <td colSpan="4">La tabla no tiene personas ingresadas</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
   );
};

export default Tabla;