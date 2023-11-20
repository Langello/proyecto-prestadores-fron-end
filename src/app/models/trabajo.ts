export interface ITrabajo {
    id:             string;
    nombre:         string;
    fecha:          string;
    lugar:          string;
    rangoHorario:   string;
    prestadorId:    number | null;
    consumidorId:   number;
    tareas:         string;
    estadoId:       number | null;
    calificacionId: number | null;
}
