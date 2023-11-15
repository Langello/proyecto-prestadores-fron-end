import { IUsuario } from "./usuario";

export interface IConsumidor {
    metodo_pago:               string;
    usuario:                   IUsuario | null;
}