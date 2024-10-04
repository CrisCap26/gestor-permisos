import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
    try {
        const incidencia = await prisma.empleado_catalogo_incidencias.findFirst({
            where: {
                Id: Number(params.id)
            }
        });

        if(!incidencia)
            return NextResponse.json({ message: "Note not found"}, { status: 404});

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