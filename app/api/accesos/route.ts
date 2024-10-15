//Necesito idEmpleado, idAcceso
import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

export async function POST(request: Request) {
    try {
        const { idAcceso } = await request.json();
       
        const findUserAccess = await prisma.empleado_accesos.findMany({
            where: {
                empleado_tipo_id: idAcceso
             },
            select: {
                Empleado_principal: {
                    select: {
                        id: true,
                    }
                }, 
            }
        })
        if (!findUserAccess)
            return NextResponse.json({ message: "Hubo un problema al buscar el acceso" }, { status: 404 });

        const ids: number [] = findUserAccess.map(item => item.Empleado_principal.id);
        return NextResponse.json(ids)
        
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