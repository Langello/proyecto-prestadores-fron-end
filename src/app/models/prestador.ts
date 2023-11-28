import { IUsuario } from './usuario.js';
import { ICalificacion } from './calificacion.js';
export interface IPrestador {
    cuilCuit:                   string;
    descripcion:                string;
    fotosTrabajosRealizados:    null | string;
    horariosAtencion:           string;
    disponibilidad:             boolean;
    radioCobertura:             string;
    usuario:                    IUsuario | null;
    promedioCalificacion?:      number | null;
    id:                         string;
}


