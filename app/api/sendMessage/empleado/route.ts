import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { waNum, mensaje } = await request.json();
        console.log(waNum, mensaje);

        const response = await fetch('http://bot.jrpaqueteria.mx/nodejs/apibot/sendMsg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ waNum, mensaje })
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