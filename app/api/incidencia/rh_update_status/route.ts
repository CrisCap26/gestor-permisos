import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

export async function PUT(request: Request) {
    try {
        const { idIncidencia, status, estatusIncidencia } = await request.json();
        console.log(idIncidencia, status);

        const updateStatus = await prisma.empleado_incidencias.update({
            where: { Id: Number(idIncidencia) },
            data: {
                rh_estatus_autoriza: status,
                fecha_rh_autoriza: new Date(),
                Estatus_incidencia: estatusIncidencia
            }
        })

        console.log("RH Actualiza estatus: ",updateStatus)
        if (!updateStatus)
            return NextResponse.json({ message: "Hubo un problema al actualizar el status" }, { status: 404 });
        if(updateStatus.rh_estatus_autoriza === 1) {
            return NextResponse.json({ 
                idStatus: true, 
                message: "RH aprobó incidencia",
                ok: true
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                idStatus: false, 
                message: "RH rechazó incidencia",
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