export interface Incidencia {
    id: number;
    fecha: string;
    fechaInicio: string;
    fechaFin: string;
    observaciones: string;
    tipoIncidencia: string;
    estatusIncidencia: boolean;
    jefeEstatusAut: boolean;
    fechaJefeAut: string;
    rhEstatusAut: boolean;
    fechaRhAut: string;
}