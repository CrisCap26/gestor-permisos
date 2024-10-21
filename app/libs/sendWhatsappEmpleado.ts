import { urlBot } from "./baseUrl";

export const sendWhatsappEmpleado = async (num: string, status: number, nombre: string, nombreAceptaRechaza: string) => {
    let statusText;
    try {
        if (status === 1 || status) {
            statusText = "Aceptada"
        } else {
            statusText = "Rechazada"
        }
        const msg = `Hola ${nombre} tu solicitud de incidencias a nóminas fue ${statusText} por ${nombreAceptaRechaza}.`;
        console.log(num, msg)
        const response = await fetch(`${urlBot}/sendMsg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                waNum: num,
                mensaje: msg
            }),
        });
        console.log("", response)
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error sendWhatsappEmpleado", error);
    }
}