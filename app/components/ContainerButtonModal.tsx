'use client'

import React, { useState } from 'react'
import ModalPassword from './ModalPassword'
import { Empleado } from '../interfaces/Empleado';
import { Incidencia } from '../interfaces/Incidencia';
import { Chip } from "@nextui-org/react";

interface ButtonProps {
    dataEmpleado: Empleado;
    dataIncidencia: Incidencia;
    role: string;
    updateStatusIncidencia: (status: number) => void;
}

export default function ContainerButtonModal({ dataEmpleado, dataIncidencia, role, updateStatusIncidencia }: ButtonProps) {
    const userValidation = dataEmpleado.jefe.password;
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [statusJefeChange, setStatusJefeChange] = useState(dataIncidencia.jefeEstatusAut);
    const [statusRhChange, setStatusRhChange] = useState(dataIncidencia.rhEstatusAut);
    const handlePasswordValidation = (isCorrect: boolean) => {
        setIsPasswordCorrect(isCorrect);
    }

    const updateJefeStatus = (status: number) => {
        setStatusJefeChange(status);
    }

    const updateRhStatus = (status: number) => {
        setStatusRhChange(status);
    }

    //Si es igual a 0 es porque no ha contestado
    if (statusJefeChange !== 0 && role === '0') {
        return (
            <div className='flex justify-center mb-5'>
                <Chip
                    className='text-md'
                    color='warning'
                    variant='bordered'
                    size='lg'
                >
                    Ya contestaste a la solicitud
                </Chip>
            </div>
        )
    } else if (statusRhChange !== 0 && role === '1') {
        return (
            <div className='flex justify-center mb-5'>
                <Chip
                    className='text-md'
                    color='warning'
                    variant='bordered'
                    size='lg'
                >
                    Ya contestaste a la solicitud RH
                </Chip>
            </div>
        )
    } else {
        return (
            <div className={isPasswordCorrect ? 'hidden' : `flex gap-6 justify-center items-center p-5 mt-2`}>
                <ModalPassword
                    userValidation={userValidation}
                    onPasswordValidation={handlePasswordValidation}
                    title='Rechazar'
                    idIncidencia={dataIncidencia.id}
                    statusJefe={dataIncidencia.jefeEstatusAut}
                    usernameJefe={dataEmpleado.jefe.username}
                    nameJefe={dataEmpleado.jefe.nombre}
                    role={role}
                    updateJefeStatus={updateJefeStatus}
                    updateRhStatus={updateRhStatus}
                    updateStatusIncidencia={updateStatusIncidencia}
                    nombreEmpleado={dataEmpleado.nombre}
                    numCelEmpleado={dataEmpleado.celular}
                    statusActualIncidencia={dataEmpleado.id}
                    idJefe={dataEmpleado.jefe.id}
                />

                <ModalPassword
                    userValidation={userValidation}
                    onPasswordValidation={handlePasswordValidation}
                    title='Aceptar'
                    idIncidencia={dataIncidencia.id}
                    statusJefe={dataIncidencia.jefeEstatusAut}
                    usernameJefe={dataEmpleado.jefe.username}
                    nameJefe={dataEmpleado.jefe.nombre}
                    role={role}
                    updateJefeStatus={updateJefeStatus}
                    updateRhStatus={updateRhStatus}
                    updateStatusIncidencia={updateStatusIncidencia}
                    nombreEmpleado={dataEmpleado.nombre}
                    numCelEmpleado={dataEmpleado.celular}
                    statusActualIncidencia={dataEmpleado.id}
                    idJefe={dataEmpleado.jefe.id}
                />
            </div>
        )
    }


}
