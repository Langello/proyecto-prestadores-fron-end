import { IEstado } from "./estado";
import { ICalificacion } from "./calificacion";
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
    calificacione:   ICalificacion | null;
}
