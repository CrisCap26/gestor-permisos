import React from 'react'
import { Card, CardBody, CardHeader, Chip, Divider, Image } from '@nextui-org/react'
import { Incidencia } from '../interfaces/Incidencia';
import { formatDate } from '../libs/formatFecha';

interface DatosIncidenciaProps {
    incidencia: Incidencia;
}
export default function CardDatosIncidencia({incidencia}: DatosIncidenciaProps) {
    
    const incidenciaInfo = [
        { label: 'Tipo:', value: incidencia.tipoIncidencia, isImage: false },
        { label: 'Status:', value: "En espera", isImage: false },
        { label: 'Fecha solicitada:', value: formatDate(incidencia.fecha), isImage: false },
        { label: 'Comentarios:', value: incidencia.observaciones, isImage: false },
        { label: 'Archivo:', value: 'https://jktornel.com.mx/wp-content/uploads/2021/03/shutterstock_1199926672.jpg', isImage: true },
    ];

    const incidenciaVacaciones = [
        { label: 'Tipo:', value: incidencia.tipoIncidencia, isImage: false },
        { label: 'Status:', value: "En espera", isImage: false },
        { label: 'Fecha de incio:', value: formatDate(incidencia.fechaInicio), isImage: false },
        { label: 'Fecha de termino:', value: formatDate(incidencia.fechaFin), isImage: false },
        { label: 'Días disfrutados:', value: '4', isImage: false },
        { label: 'Comentarios:', value: incidencia.observaciones, isImage: false },
    ];

    let labels;
    if(incidencia.tipoIncidencia === "Vacaciones") {
        labels = incidenciaVacaciones;
    } else {
        labels = incidenciaInfo;
    }
    

    return (
        <div className='mt-3'>
            <Card className='border-small border-white/50'>
                <CardHeader>
                    Datos de la incidencia
                </CardHeader>
                <Divider />
                <CardBody className='flex-col gap-5'>
                    {
                        labels.map((info, i) => (
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
