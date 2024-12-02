import { baseUrl } from "./baseUrl";
//const baseUrl = "https://7fdb-200-92-209-202.ngrok-free.app"
export const fetchDataIncidencia = async (idIncidencia: number) => {
    const response = await fetch(`${baseUrl}/api/incidencia/${idIncidencia}`, {
      cache: 'no-store'
    });
    if (!response.ok) {
        return response.ok;
    }
    return response.json();
};

export const jefeUpdateStatus = async (idIncidencia: number, idEmpleadoAutoriza: number, estatusIncidencia: number) => {
    const response = await fetch(`${baseUrl}/api/incidencia/jefe_update_status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idIncidencia, idEmpleadoAutoriza, estatusIncidencia }),
      });
      if (!response.ok) {
        return response.ok;
      }
      return response.json();
}


export const rhUpdateStatus = async (idIncidencia: number, idEmpleadoRH: number,  estatusIncidencia: number) => {
  const response = await fetch(`${baseUrl}/api/incidencia/rh_update_status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idIncidencia, idEmpleadoRH, estatusIncidencia }),
    });
    if (!response.ok) {
      return response.ok;
    }
    return response.json();
}

export const incidenciaUpdateStatus = async (idIncidencia: number) => {
  const response = await fetch(`${baseUrl}/api/incidencia/${idIncidencia}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      return response.ok;
    }
    return response.json();
}