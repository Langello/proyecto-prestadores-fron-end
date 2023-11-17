import { IUsuario } from './usuario';
export interface IPrestador {
    cuilCuit:                   string;
    descripcion:                string;
    fotosTrabajosRealizados:    null | string;
    horariosAtencion:           string;
    disponibilidad:             boolean;
    radioCobertura:             string;
    usuario:                    IUsuario | null;
    id:                         string;
}


