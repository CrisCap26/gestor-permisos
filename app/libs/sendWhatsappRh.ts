import { baseUrl, urlBot } from "./baseUrl";

export const sendWhatsappRh = async  (arrNumbers: string[], idIncidencia: number, nombre: string) => {
    try {
        const msg = `
Hola, ${nombre} realizo una solicitud de incidencias a nóminas.\n
Puedes ver los detalles en el siguiente link:\n
${baseUrl}/Home?idIncidencia=${idIncidencia}&role=1`;
        const formattedNumbers = arrNumbers.map(numCel => ({
            waNum: numCel,
            msg: msg
        }))
        
        const response = await fetch(urlBot, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ arrData: formattedNumbers }),
          });
        console.log("", response)
        if(response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Error sendWhatsappRh", error);
    }
}