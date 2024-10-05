import { Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react'
import React from 'react'
import Buttons from './Buttons'
import { Empleado } from '../interfaces/Empleado';

interface DatosEmpleadoProps {
    empleado: Empleado;
}
export default function CardDatosEmpleado({empleado}: DatosEmpleadoProps) {

    const userInfo = [
        { label: 'Nombre:', value: empleado.nombre },
        { label: 'Departamento:', value: empleado.departamento },
        { label: 'Sucursal:', value: empleado.sucursal },
        { label: 'Jefe inmediato:', value: empleado.jefe},
    ];

    return (
        <div className='mt-3'>
            <Card className='border-small border-white/50'>
                <CardHeader className='md:text-[17px]'>
                    Datos del empleado
                </CardHeader>
                <Divider />
                <CardBody className='flex-col gap-5'>
                    {
                        userInfo.map((info, i) => (
                            <div className='flex flex-row items-center' key={i}>
                                <Chip
                                    color="primary"
                                    radius="sm"
                                    classNames={{
                                        base: "bg-[#0f5ea3]",
                                        content: "text-white md:text-[17px]",
                                    }}
                                >
                                    {info.label}
                                </Chip>
                                <div className='ml-3 text-[14px] md:text-[17px]'>{info.value}</div>
                            </div>
                        ))
                    }
                </CardBody>

            </Card>
        </div>
    )
}
