import { IEstado } from "./estado";
export interface ITrabajo {
    id:             string;
    nombre:         string;
    fecha:          string;
    lugar:          string;
    rangoHorario:   string;
    prestadorId:    number | null;
    consumidorId:   number;
    tareas:         string;
    estado:         IEstado;
    calificacionId: number | null;
}
