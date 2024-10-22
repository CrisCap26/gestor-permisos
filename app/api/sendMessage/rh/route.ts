import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { arrData } = await request.json();

        const response = await fetch('http://bot.jrpaqueteria.mx/nodejs/apibot/multiSendMsg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ arrData })
        });

        const data = await response.json();

        // Devolver la respuesta del servicio externo
        return NextResponse.json(data, { status: response.status });

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