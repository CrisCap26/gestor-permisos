import React from 'react'
import { Card, CardBody, CardHeader, Chip, Divider, Image } from '@nextui-org/react'

export default function CardDatosIncidencia() {
    const incidenciaInfo = [
        { label: 'Tipo:', value: 'Permiso de llegar tarde' },
        { label: 'Fecha solicitada:', value: '09/10/2024' },
        { label: 'Comentarios:', value: 'Se me poncho la llanta en camino al trabajo' },
        { label: 'Archivo:', value: 'https://jktornel.com.mx/wp-content/uploads/2021/03/shutterstock_1199926672.jpg', isImage: true },
    ];

    const incidenciaVacaciones = [
        { label: 'Tipo:', value: 'Vacaciones' },
        { label: 'Fecha de incio:', value: '09/10/2024' },
        { label: 'Fecha de termino:', value: '12/10/2024' },
        { label: 'Días disfrutados:', value: '4' },
        { label: 'Comentarios:', value: '' },
    ];

    return (
        <div className='mt-3'>
            <Card className='border-small border-white/50'>
                <CardHeader>
                    Datos de la incidencia
                </CardHeader>
                <Divider />
                <CardBody className='flex-col gap-5'>
                    {
                        incidenciaInfo.map((info, i) => (
                            <div className={info.isImage ? 'flex flex-row items-start' : 'flex flex-row items-center'} key={i}>
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
                                <div className='ml-3 text-[14px] md:text-[17px]'>
                                    {info.isImage ? (
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl"
                                            src={info.value}
                                            width={270}
                                            isZoomed={true}
                                        />
                                    ) : (
                                        info.value
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </CardBody>
            </Card>
        </div>
    )
}
