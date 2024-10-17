import { accesoValidarRH, baseUrl } from "./baseUrl";

export const getDataRhByAuth = async (): Promise<string[]> => {
    try {
        const resEmpleadoAcceso = await fetch(`${baseUrl}/api/accesos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idAcceso: accesoValidarRH
            }),
        });

        if (!resEmpleadoAcceso.ok) {
            return [];
        }

        const acceso: number[] = await resEmpleadoAcceso.json();

        const numbersRh: string[] = await Promise.all(acceso.map(async (id) => {
            const response = await fetch(`${baseUrl}/api/empleado/${id}`, {
                cache: 'no-store'
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.celular; // Devuelve el número celular
            }
            return null; // Devuelve null si la respuesta no es ok
        }));
        console.log(numbersRh, "Numbers")
        // Filtrar valores nulos (si los hay)
        return numbersRh.filter((num): num is string => num !== null);
       
    } catch (error) {
        console.log("Error getDataRhByAuth: ", error)
        if (error instanceof Error) {
            return [];
        }
        return[];
    }
}