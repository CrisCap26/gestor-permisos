import { baseUrl } from "./baseUrl";

export const fetchDataIncidencia = async (idIncidencia: number) => {
    const response = await fetch(`${baseUrl}/api/incidencia/${idIncidencia}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
        return response.ok;
    }
    return response.json();
};

export const jefeUpdateStatus = async (idIncidencia: number, status: number) => {
    const response = await fetch(`${baseUrl}/api/incidencia/jefe_update_status`, {
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
  const response = await fetch(`${baseUrl}/api/incidencia/rh_update_status`, {
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