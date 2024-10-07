export const fetchDataIncidencia = async (idIncidencia: string) => {
    const response = await fetch(`http://localhost:3000/api/incidencia/${idIncidencia}`);
    if (!response.ok) {
        return response.ok;
    }
    return response.json();
};