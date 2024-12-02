import { accesoValidarRH, baseUrl } from "./baseUrl";
//const accesoValidarRH = 42;
//const baseUrl =  "https://7fdb-200-92-209-202.ngrok-free.app"
interface userValidation {
    exists: boolean;
    idEmpleado: number;
}
export const userValidationAccess = async (username: string, password: string): Promise<userValidation | undefined> => {
    try {
        const resUser = await fetch(`${baseUrl}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        if (!resUser.ok) {
            return {
                exists: false,
                idEmpleado: -1,
            };
        }
        const {idEmpleado} = await resUser.json();
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
            return {
                exists: false,
                idEmpleado: -1,
            };
        }

        const acceso: number[] = await resEmpleadoAcceso.json();
        const exists: boolean = acceso.includes(idEmpleado)
        //console.log("ValidationAccess", exists)

        return {
            exists,
            idEmpleado,
        };
    } catch (error) {
        console.log("Error userValidationAccess: ", error)
        if (error instanceof Error) {
            return {
                exists: false,
                idEmpleado: -1,
            };
        }
    }
}