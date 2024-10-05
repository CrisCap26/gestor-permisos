import React from 'react'
import CardDatosEmpleado from '../components/CardDatosEmpleado'
import CardDatosIncidencia from '../components/CardDatosIncidencia'
import Buttons from './Buttons'
import { EmpleadoIncidencia } from '../interfaces/EmpleadoIncidencia'

interface CardProps {
    data: EmpleadoIncidencia;
}
export default function Cards({data}: CardProps) {
    return (
        <div className='md:flex md:flex-col md:items-center md:justify-center'>
            <div className='flex flex-col min-w-72 md:flex-row mt-1 gap-3 p-3'>
                {/* Aquí van las cards Datos empleado y datos incidencia */}
                <CardDatosEmpleado empleado={data.empleado} />
                <CardDatosIncidencia incidencia={data.incidencia} />
            </div>

            <Buttons />
        </div>
    )
}
