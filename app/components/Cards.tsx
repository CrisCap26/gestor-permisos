'use client'
import React, { useState } from 'react'
import CardDatosEmpleado from '../components/CardDatosEmpleado'
import CardDatosIncidencia from '../components/CardDatosIncidencia'
import ContainerButtonModal from './ContainerButtonModal'
import { EmpleadoIncidencia } from '../interfaces/EmpleadoIncidencia'

interface CardProps {
    data: EmpleadoIncidencia;
    role: string;
}
export default function Cards({data, role}: CardProps) {
    const [statusIncidencia, setStatusIncidencia] = useState(data.incidencia.estatusIncidencia);
    const incidencia = {
        ...data.incidencia,
        estatusIncidencia: statusIncidencia,
    }

    const updateIncidenciaStatus = (status: number) => {
        setStatusIncidencia(status);
    }

    return (
        <div className='md:flex md:flex-col md:items-center md:justify-center'>
            <div className='flex flex-col min-w-72 md:flex-row mt-1 gap-3 p-3'>
                <CardDatosEmpleado empleado={data.empleado} />
                <CardDatosIncidencia incidencia={incidencia} />
            </div>

            <ContainerButtonModal 
                dataEmpleado={data.empleado} 
                dataIncidencia={data.incidencia}
                role={role}
                updateStatusIncidencia={updateIncidenciaStatus}
            />
        </div>
    )
}
