'use client'

import React, { useState } from 'react'
import ModalPassword from './ModalPassword'
import { Empleado } from '../interfaces/Empleado';

interface ButtonProps {
    dataEmpleado: Empleado;
}

export default function ContainerButtonModal({dataEmpleado}: ButtonProps) {
    const userValidation = dataEmpleado.password;
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
            />

            <ModalPassword 
                userValidation={userValidation} 
                onPasswordValidation={handlePasswordValidation}
                title='Aceptar'
            />
        </div>
    )
}