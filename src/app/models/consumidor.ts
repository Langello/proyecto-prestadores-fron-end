import { IUsuario } from "./usuario";

export interface IConsumidor {
    metodoPago:               string;
    usuario:                   IUsuario | null;
    id:                        string;
}