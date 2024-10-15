const server = "http://localhost:3000/";
//const server = "https://gqmw873x-3000.usw3.devtunnels.ms/"

export const fetchDataIncidencia = async (idIncidencia: number) => {
    const response = await fetch(`http://localhost:3000/api/incidencia/${idIncidencia}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
        return response.ok;
    }
    return response.json();
};

export const jefeUpdateStatus = async (idIncidencia: number, status: number) => {
    const response = await fetch(server + 'api/incidencia/jefe_update_status', {
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
  const response = await fetch(server + 'api/incidencia/rh_update_status', {
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