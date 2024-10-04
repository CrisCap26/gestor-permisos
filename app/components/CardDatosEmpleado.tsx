import { Card, CardBody, CardHeader, Chip, Divider } from '@nextui-org/react'
import React from 'react'
import Buttons from './Buttons'

export default function CardDatosEmpleado() {

    const userInfo = [
        { label: 'Nombre:', value: 'Cristopher Herrera Perez' },
        { label: 'Departamento:', value: 'Sistemas' },
        { label: 'Sucursal:', value: 'Perisur' },
        { label: 'Jefe inmediato:', value: 'Moises Velez Avila' },
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
