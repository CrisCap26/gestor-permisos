import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const incidencia = await prisma.empleado_incidencias.findUnique({
            where: {
                Id: Number(params.id)
            },
            select: {
                fecha: true,
                FechaInicio: true,
                FechaFin: true,
                observaciones: true,
                tipoIncidencia: {
                    select: {
                        descripcion: true,
                    },
                },
                nombreEmpleado: {
                    select: {
                        nombre: true,
                    }
                }
            }
        });

        if (!incidencia)
            return NextResponse.json({ message: "Note not found" }, { status: 404 });

        return NextResponse.json(incidencia)
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