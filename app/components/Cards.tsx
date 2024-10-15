'use client'

import React, { useEffect, useState } from 'react'
import CardDatosEmpleado from '../components/CardDatosEmpleado'
import CardDatosIncidencia from '../components/CardDatosIncidencia'
import ContainerButtonModal from './ContainerButtonModal'
import { EmpleadoIncidencia } from '../interfaces/EmpleadoIncidencia'
import { Empleado } from '../interfaces/Empleado'
import { Incidencia } from '../interfaces/Incidencia'
import { fetchDataIncidencia } from '../libs/fetchDataIncidencia'

interface CardProps {
    data: EmpleadoIncidencia;
    role: string;
}
export default function Cards({data, role}: CardProps) {
    const [dataEmpleado, setDataEmpleado] = useState<Empleado>(data.empleado);
    const [dataIncidencia, setDataIncidencia] = useState<Incidencia>(data.incidencia);
    const [updateDate, setUpdateDate] = useState(false);

    const updateDataCards = async () => {
        const response = await fetchDataIncidencia(dataIncidencia.id);
        if(response.ok) {
            console.log(response.empleado)
            setDataEmpleado(response.empleado);
            setDataIncidencia(response.incidencia);
            setUpdateDate(false); // Reset the updateDate flag to false to avoid unnecessary API calls.
        }
    }

    const stateData = (dataChange: boolean) => {
        setUpdateDate(dataChange)
    }

    useEffect(() => {
        console.log("Entro al update")
        updateDataCards();
    }, [updateDate])

    return (
        <div className='md:flex md:flex-col md:items-center md:justify-center'>
            <div className='flex flex-col min-w-72 md:flex-row mt-1 gap-3 p-3'>
                <CardDatosEmpleado empleado={dataEmpleado} />
                <CardDatosIncidencia incidencia={dataIncidencia} />
            </div>

            <ContainerButtonModal 
                dataEmpleado={dataEmpleado} 
                dataIncidencia={dataIncidencia}
                role={role}
                updateData={stateData}
            />
        </div>
    )
}
