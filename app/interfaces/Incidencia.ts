export interface Incidencia {
    id: number;
    fecha: string;
    fechaInicio: string;
    fechaFin: string;
    observaciones: string;
    tipoIncidencia: string;
    estatusIncidencia: number;
    jefeEstatusAut: number;
    fechaJefeAut: string;
    rhEstatusAut: number;
    fechaRhAut: string;
}