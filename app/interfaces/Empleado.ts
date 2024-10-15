export interface Empleado {
    nombre: string;
    departamento: string;
    sucursal: string;
    password: string;
    jefe: {
        id: number;
        nombre: string;
        username: string;
        password: string;
        idLogin: number;
    }
}