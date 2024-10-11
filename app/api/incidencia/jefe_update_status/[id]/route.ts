import { NextResponse } from "next/server";
import { prisma } from '@/app/libs/prisma';

interface Params {
    params: { id: string };
}

export async function POST(request: Request,  { params }: Params) {
    try {
        const updateStatus = await prisma.empleado_incidencias.update({
            where: { Id: Number(params.id) },
            data: {
                jefe_estatus_autoriza: 1
            }
        })
        console.log("Jefe Actuañiza estatus: ",updateStatus)
        if (!updateStatus)
            return NextResponse.json({ message: "Not change status" }, { status: 404 });
        return NextResponse.json(updateStatus)
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