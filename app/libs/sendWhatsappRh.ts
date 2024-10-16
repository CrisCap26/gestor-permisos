interface arrNumbersMsg {
    waNum: string;
    msg: string;
}
//const url = "https://gqmw873x-3000.usw3.devtunnels.ms/Home?idIncidencia="
const url = "http://localhost:3000/Home?idIncidencia="
export const sendWhatsappRh = async  (arrNumbers: string[], idIncidencia: number, nombre: string) => {
    try {
        const msg = `
Hola, ${nombre} realizo una solicitud de incidencias a nóminas.\n
Puedes ver los detalles en el siguiente link:\n
${url}${idIncidencia}&role=1`;
        const formattedNumbers = arrNumbers.map(numCel => ({
            waNum: numCel,
            msg: msg
        }))
        
        const urlBotLocal = "http://localhost:3002/nodejs/apibot/multiSendMsg"
        const urlBot = "http://bot.jrpaqueteria.mx/nodejs/apibot/multiSendMsg";
        const response = await fetch(urlBotLocal, {
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