import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

export async function PUT(request: Request) {
    try {
        const { idIncidencia, idEmpleadoAutoriza, estatusIncidencia } = await request.json();
        console.log(idIncidencia, idEmpleadoAutoriza, estatusIncidencia);

        const updateStatus = await prisma.empleado_incidencias.update({
            where: { Id: Number(idIncidencia) },
            data: {
                jefe_estatus_autoriza: idEmpleadoAutoriza,
                fecha_jefe_autoriza: new Date(),
                Estatus_incidencia: estatusIncidencia
            }
        })

        console.log("Jefe Actualiza estatus: ",updateStatus)
        if (!updateStatus)
            return NextResponse.json({ message: "Hubo un problema al actualizar el status" }, { status: 404 });
        if(updateStatus.jefe_estatus_autoriza !== -1 && updateStatus.jefe_estatus_autoriza !== 0) {
            return NextResponse.json({ 
                idStatus: updateStatus.jefe_estatus_autoriza, 
                message: "Jefe aprobó incidencia",
                ok: true
            }, { status: 200 });
        } else {
            return NextResponse.json({ 
                idStatus: updateStatus.jefe_estatus_autoriza, 
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