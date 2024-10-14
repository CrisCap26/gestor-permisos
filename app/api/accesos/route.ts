//Necesito idEmpleado, idAcceso
import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

export async function POST(request: Request) {
    try {
        const { idEmpleado, idAcceso } = await request.json();
       
        const findUserAccess = await prisma.empleado_accesos.findMany({
            where: { 
                empleado_principal_id: idEmpleado,
                empleado_tipo_id: idAcceso
             },
            select: {
                id: true,
                Empleado_principal: {
                    select: {
                        nombre: true,
                    }
                }, 
                Empleado_tipo: {
                    select: {
                        nombre: true,
                    }
                }
            }
        })
        if (!findUserAccess)
            return NextResponse.json({ message: "Hubo un problema al buscar el acceso" }, { status: 404 });
        
        if(findUserAccess.length !== 0) {
            return NextResponse.json({
                userFound: true,
            })
        } else {
            return NextResponse.json({
                userFound: false,
            })
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