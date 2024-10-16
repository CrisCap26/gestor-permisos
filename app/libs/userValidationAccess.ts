const accesoValidarRH = 31;
export const userValidationAccess = async (username: string, password: string): Promise<boolean | undefined> => {
    try {
        const resUser = await fetch(`http://localhost:3000/api/user`, {
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
        const resEmpleadoAcceso = await fetch(`http://localhost:3000/api/accesos`, {
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