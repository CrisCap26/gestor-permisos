import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        console.log(username, password);

        const findUser = await prisma.login_principal.findMany({
            where: { 
                usuario: username,
                contrasena: password
             },
            select: {
                id: true,
                usuario: true,
                contrasena: true,
                Empleado_principal: {
                    select: {
                        id: true,
                    }
                }
            }
        })
        if (!findUser)
            return NextResponse.json({ message: "Hubo un problema al actualizar el status" }, { status: 404 });
        const response = {
            idEmpleado: findUser[0].Empleado_principal[0].id
        }
        return NextResponse.json(response);
        
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