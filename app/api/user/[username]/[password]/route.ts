import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { username: string, password: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const empleado = await prisma.login_principal.findMany({
            where: {
                usuario: params.username,
                contrasena: params.password
            },
            select: {
                id: true,
            }
        });

        if (!empleado)
            return NextResponse.json({ message: "User not found" }, { status: 404 });

        console.log(empleado)
        if(empleado.length !== 0) {
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