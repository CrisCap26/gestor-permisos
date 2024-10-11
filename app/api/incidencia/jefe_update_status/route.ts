import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function PUT(request: Request,  { params }: Params) {
    try {
        const { idIncidencia, status } = await request.json();
        console.log(idIncidencia, status);

        const updateStatus = await prisma.empleado_incidencias.update({
            where: { Id: Number(idIncidencia) },
            data: {
                jefe_estatus_autoriza: status,
                fecha_jefe_autoriza: new Date(),
            }
        })

        // const updateStatus = await prisma.empleado_incidencias.update({
        //     where: { Id: Number(params.id) },
        //     data: {
        //         jefe_estatus_autoriza: 1
        //     }
        // })
        console.log("Jefe Actualiza estatus: ",updateStatus)
        if (!updateStatus)
            return NextResponse.json({ message: "Hubo un problema al actualizar el status" }, { status: 404 });
        if(updateStatus.jefe_estatus_autoriza === 1) {
            return NextResponse.json({ 
                idStatus: true, 
                message: "Jefe aprobó incidencia",
                ok: true
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                idStatus: false, 
                message: "Jefe rechazó incidencia",
                ok: true
             }, {status: 200})
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 500,
            })
        }
    }
}