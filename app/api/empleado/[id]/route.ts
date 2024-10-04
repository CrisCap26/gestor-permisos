import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const empleado = await prisma.empleado_principal.findUnique({
            where: {
                id: Number(params.id)
            },
            select: {
                nombre: true,
                departamento: true,
                sucursal: {
                    select: {
                        nombre: true,
                    },
                },
                jefe: {
                    select: {
                        nombre: true,
                    }
                }
            }
        });

        if (!empleado)
            return NextResponse.json({ message: "Note not found" }, { status: 404 });

        return NextResponse.json(empleado)
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