export const fetchDataIncidencia = async (idIncidencia: string) => {
    const response = await fetch(`http://localhost:3000/api/incidencia/${idIncidencia}`);
    if (!response.ok) {
        return response.ok;
    }
    return response.json();
};

export const jefeUpdateStatus = async (idIncidencia: number, status: number) => {
    const response = await fetch('http://localhost:3000/api/incidencia/jefe_update_status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idIncidencia, status }),
      });
      if (!response.ok) {
        return response.ok;
      }
      return response.json();
}


export const rhUpdateStatus = async (idIncidencia: number, status: number) => {
  const response = await fetch('http://localhost:3000/api/incidencia/rh_update_status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idIncidencia, status }),
    });
    if (!response.ok) {
      return response.ok;
    }
    return response.json();
}