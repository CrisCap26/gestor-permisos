export interface Empleado {
    id: number;
    nombre: string;
    departamento: string;
    sucursal: string;
    password: string;
    celular: string;
    jefe: {
        id: number;
        nombre: string;
        username: string;
        password: string;
        idLogin: number;
    }
}