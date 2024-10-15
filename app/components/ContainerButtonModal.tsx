'use client'

import React, { useState } from 'react'
import ModalPassword from './ModalPassword'
import { Empleado } from '../interfaces/Empleado';
import { Incidencia } from '../interfaces/Incidencia';

interface ButtonProps {
    dataEmpleado: Empleado;
    dataIncidencia: Incidencia;
    role: string;
}

export default function ContainerButtonModal({dataEmpleado, dataIncidencia, role}: ButtonProps) {
    const userValidation = dataEmpleado.jefe.password;
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const handlePasswordValidation = (isCorrect: boolean) => {
        setIsPasswordCorrect(isCorrect);
    }

    return (
        <div className={isPasswordCorrect ? 'hidden' : `flex gap-6 justify-center items-center p-5 mt-2`}>
            <ModalPassword 
                userValidation={userValidation} 
                onPasswordValidation={handlePasswordValidation}
                title='Rechazar'
                idIncidencia={dataIncidencia.id}
                statusJefe={dataIncidencia.jefeEstatusAut}
                usernameJefe={dataEmpleado.jefe.username}
                role={role}
            />

            <ModalPassword 
                userValidation={userValidation} 
                onPasswordValidation={handlePasswordValidation}
                title='Aceptar'
                idIncidencia={dataIncidencia.id}
                statusJefe={dataIncidencia.jefeEstatusAut}
                usernameJefe={dataEmpleado.jefe.username}
                role={role}
            />
        </div>
    )
}
