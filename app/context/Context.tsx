'use client'
import { createContext, useState } from "react";

export const Context = createContext<{
    dataIncidencia: any[],
    dataEmpleado: any[]  // Define the type of dataEmpleado here as per your needs. For example, it could be an object with properties like name, department, etc.
}>({});

export const AppProvider = ({ children }: { children: React.ReactNode }, 
    { searchParams }: { searchParams: { idIncidencia?: string; idEmpleado?: string } }
) => {

    //const { idIncidencia, idEmpleado } = searchParams;

    const [dataIncidencia, setDataIncidencia] = useState([]);
    const [dataEmpleado, setDataEmpleado] = useState([]);

    // const res = await fetch('/api/tipos', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ idEmpleado, idIncidencia }),

    // });
    // async function loadDataEmpleado() {
    //     const res = await fetch(`api/empleado/${idIncidencia}`);
    //     const data = await res.json();
    //     setDataEmpleado(data);
    // }

    return (
        <Context.Provider value={{ dataIncidencia, dataEmpleado }}>
            {children}
        </Context.Provider>
    )
}