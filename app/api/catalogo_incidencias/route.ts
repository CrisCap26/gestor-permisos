import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma";

export async function GET() {
    try {
        const catalogoIncidencias = await prisma.empleado_catalogo_incidencias.findMany();
        return NextResponse.json(catalogoIncidencias)
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

export async function POST(request: Request) {
    try {
        const { Id, descripcion } = await request.json();
        const newItem = await prisma.empleado_catalogo_incidencias.create({
            data: {
                Id: Number(Id),
                descripcion
            }
        });

        return NextResponse.json(newItem)
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