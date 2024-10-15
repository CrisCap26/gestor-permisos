'use client'

import React, { useState, useEffect } from 'react'
import ModalPassword from './ModalPassword'
import { Empleado } from '../interfaces/Empleado';
import { Incidencia } from '../interfaces/Incidencia';

interface ButtonProps {
    dataEmpleado: Empleado;
    dataIncidencia: Incidencia;
    role: string;
    updateData: (changeData: boolean) => void;
}

export default function ContainerButtonModal({ dataEmpleado, dataIncidencia, role, updateData }: ButtonProps) {
    const userValidation = dataEmpleado.jefe.password;
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const handlePasswordValidation = (isCorrect: boolean) => {
        setIsPasswordCorrect(isCorrect);
    }

    const sentTwoFunc = (isCorrect: boolean) => {
        handlePasswordValidation(isCorrect);
        updateData(isCorrect);
    }

    if (dataIncidencia.jefeEstatusAut !== -1 && role === '0') {
        return (
            <div>Ya contestaste a la solicitud</div>
        )
    } else if (dataIncidencia.rhEstatusAut !== -1 && role === '1') {
        return (
            <div>Ya contestaste a la solicitud RH</div>
        )
    } else {
        return (
            <div className={isPasswordCorrect ? 'hidden' : `flex gap-6 justify-center items-center p-5 mt-2`}>
                <ModalPassword
                    userValidation={userValidation}
                    onPasswordValidation={sentTwoFunc}
                    title='Rechazar'
                    idIncidencia={dataIncidencia.id}
                    statusJefe={dataIncidencia.jefeEstatusAut}
                    usernameJefe={dataEmpleado.jefe.username}
                    role={role}
                />

                <ModalPassword
                    userValidation={userValidation}
                    onPasswordValidation={sentTwoFunc}
                    title='Aceptar'
                    idIncidencia={dataIncidencia.id}
                    statusJefe={dataIncidencia.jefeEstatusAut}
                    usernameJefe={dataEmpleado.jefe.username}
                    role={role}
                />
            </div>
        )
    }


}
