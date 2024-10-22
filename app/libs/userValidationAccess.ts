import { accesoValidarRH, baseUrl } from "./baseUrl";
//const accesoValidarRH = 42;
//const baseUrl =  "https://7fdb-200-92-209-202.ngrok-free.app"
export const userValidationAccess = async (username: string, password: string): Promise<boolean | undefined> => {
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
            return false;
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
            return false;
        }

        const acceso: number[] = await resEmpleadoAcceso.json();
        const exists: boolean = acceso.includes(idEmpleado)
        return exists;
    } catch (error) {
        console.log("Error userValidationAccess: ", error)
        if (error instanceof Error) {
            return false;
        }
    }
}