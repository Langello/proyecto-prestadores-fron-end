import { IUsuario } from './usuario';
export interface IPrestador {
    cuil_cuit:                 string;
    descripcion:               string;
    fotos_trabajos_realizados: null | string;
    horarios_atencion:         string;
    disponibilidad:            boolean;
    radio_cobertura:           string;
    usuario:                   IUsuario | null;
}


