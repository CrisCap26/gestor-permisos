import { Button } from '@nextui-org/react'
import React from 'react'
import ModalPassword from './ModalPassword'
import { Empleado } from '../interfaces/Empleado';

interface ButtonProps {
    dataEmpleado: Empleado;
}

export default function Buttons({dataEmpleado}: ButtonProps) {
    const userValidation = dataEmpleado.password;
    return (
        <div className="flex gap-6 justify-center items-center p-5 mt-2">
            <Button className='w-80' color="danger" variant="bordered">
                Rechazar
            </Button>

            <ModalPassword userValidation={userValidation} />
        </div>
    )
}
