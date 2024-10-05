//'use client'
import Header from "../components/Header";
import Cards from "../components/Cards";
//import { useState } from "react";
//import React, {useContext} from 'react';
//import {Context} from '@/app/context/Context'
const fetchDataIncidencia = async (idIncidencia: string) => {
  const response = await fetch(`http://localhost:3000/api/incidencia/${idIncidencia}`);

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
};

const fetchDataEmpleado = async (idEmpleado: string) => {
  const response = await fetch(`http://localhost:3000/api/empleado/${idEmpleado}`);

  if (!response.ok) {
    throw new Error('Error fetching data');
  }

  return response.json();
};

export default async function Home({ searchParams }: { searchParams: { idIncidencia?: string; idEmpleado?: string } }) {

  const { idIncidencia, idEmpleado } = searchParams;

  // Aquí puedes hacer la lógica que necesites con el query
  console.log('Query parameter:', idEmpleado, idIncidencia);

  if (!idIncidencia || !idEmpleado) {
    return <h1>Error: Faltan parámetros de ID</h1>;
  }

  // Obtener datos del backend
  const dataIncidencia = await fetchDataIncidencia(idIncidencia);
  const dataEmpleado = await fetchDataEmpleado(idEmpleado);
  const datosEmpleadoIncidencia = {
    empleado: {
      nombre: dataEmpleado.nombre,
      departamento: dataEmpleado.departamento,
      sucursal: dataEmpleado.sucursal.nombre,
      jefe: dataEmpleado.jefe.nombre,
    },
    incidencia: {
      fecha: dataIncidencia.fecha,
      fechaInicio: dataIncidencia.FechaInicio,
      fechaFin: dataIncidencia.FechaFin,
      observaciones: dataIncidencia.observaciones,
      tipoIncidencia: dataIncidencia.tipoIncidencia.descripcion,
    }
  }
  console.log(datosEmpleadoIncidencia)
  // return (
  //   <div>
  //     <h1>ID de Incidencia:{dataIncidencia.tipoIncidencia.descripcion}</h1>
  //     {/* Renderiza más información aquí */}
  //   </div>
  // );

  return (
    <div className='md:grid md:grid-cols-1 md:h-screen'>
      <Header fecha={dataIncidencia.fecha} />
      <div className=''>
        <Cards data={datosEmpleadoIncidencia}/>
      </div>
    </div>
  );
}
