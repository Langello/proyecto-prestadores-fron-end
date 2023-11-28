import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrestador } from '../models/prestador';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../models/usuario';
import { IToken } from '../models/token';
import { IConsumidor } from '../models/consumidor';
import { ITrabajo } from '../models/trabajo';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase = 'https://7csx60ms-3050.brs.devtunnels.ms';
  public textObserved: Subject<string> = new Subject<string>();

  constructor(private _httpClient: HttpClient) { }

  public getPrestadores(filtro?: string): Observable<IPrestador[]> {
    return this._httpClient.get<IPrestador[]>(`${this.urlBase}/prestador?filtro=${filtro}`);
  }

  public getPrestador(id: string): Observable<IPrestador> {
    return this._httpClient.get<IPrestador>(`${this.urlBase}/prestador/${id}`);
  }

  public getConsumidor(id: string): Observable<IConsumidor> {
    console.log(id);
    console.log(`${this.urlBase}/consumidor/${id}`);
    return this._httpClient.get<IConsumidor>(`${this.urlBase}/consumidor/${id}`);
  }

  public getConsumidorIdByToken (token: IToken): Observable<IConsumidor> {
    return this._httpClient.get<IConsumidor>(`${this.urlBase}/consumidor-id/${token.token}`);
  }

  public putConsumidor(token: IToken, consumidor: IConsumidor): Observable<any> {
	return this._httpClient.put<any>(`${this.urlBase}/consumidor`, { ...consumidor, ...token });
  }

  public getUsuario(token: IToken): Observable<IUsuario> {
    return this._httpClient.get<IUsuario>(`${this.urlBase}/usuario/${token.token}`);
  }

  public postUsuario(usuario: IUsuario): Observable<IToken> {
    return this._httpClient.post<IToken>(`${this.urlBase}/usuario`, usuario);
  }

  public putUsuario(token: IToken, usuario: IUsuario): Observable<any> {
    return this._httpClient.put<any>(`${this.urlBase}/usuario`, { ...usuario, ...token });
  }

  public login(email: string, password: string): Observable<IToken> {
    return this._httpClient.post<IToken>(`${this.urlBase}/login`, { email, password });
  }

  public postPrestador(prestador: IPrestador, token: IToken): Observable<IPrestador> {
    return this._httpClient.post<IPrestador>(`${this.urlBase}/prestador`, { ...prestador, ...token });
  }

  public getPrestadorIdByToken (token: IToken): Observable<IPrestador> {
    return this._httpClient.get<IPrestador>(`${this.urlBase}/prestador-id/${token.token}`);
  }

  public putPrestador(token: IToken, prestador: IPrestador): Observable<any> {
    return this._httpClient.put<any>(`${this.urlBase}/prestador`, { ...prestador, ...token });
  }

  public postConsumidor(consumidor: IConsumidor, token: IToken): Observable<IConsumidor> {
    return this._httpClient.post<IConsumidor>(`${this.urlBase}/consumidor`, { ...consumidor, ...token });
  }
  public postMensajeAPrestador(asunto: string, mensaje: string, idDestino: string, token: IToken): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/mensaje-a-prestador`, { asunto, mensaje, idDestino, ...token });
  }

  public postMensajeAConsumidor(asunto: string, mensaje: string, idDestino: string, token: IToken): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/mensaje-a-consumidor`, { asunto, mensaje, idDestino, ...token });
  }

  public getMensajeConsumidorRecibido (token: IToken): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-consumidor-recibido/${token.token}`);
  }

  public getMensajePrestadorRecibido (token: IToken): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-prestador-recibido/${token.token}`);
  }

  public getMensajePrestadorEnviado (token: IToken): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-prestador-enviado/${token.token}`);
  }

  public getMensajeConsumidorEnviado (token: IToken): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-consumidor-enviado/${token.token}`);
  }

  public getRoles(token: IToken): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/roles`, token);
  }

  public getTrabajos(filtro?: string): Observable<ITrabajo[]> {
    return this._httpClient.get<ITrabajo[]>(`${this.urlBase}/trabajo?filtro=${filtro}`);
  }

  public getTrabajo(id: string): Observable<ITrabajo> {
    return this._httpClient.get<ITrabajo>(`${this.urlBase}/trabajo/${id}`);
  }

  public getTrabajosByConsumidor(token : IToken): Observable<ITrabajo[]> {
    return this._httpClient.get<ITrabajo[]>(`${this.urlBase}/trabajo-consumidor/${token.token}`);
  }

  public getTrabajosByPrestador(token : IToken): Observable<ITrabajo[]> {
    return this._httpClient.get<ITrabajo[]>(`${this.urlBase}/trabajo-prestador/${token.token}`);
  }

  public postTrabajo(trabajo: ITrabajo, token: IToken): Observable<ITrabajo> {
    return this._httpClient.post<ITrabajo>(`${this.urlBase}/trabajo`, { ...trabajo, ...token });
  }

  public esMiTrabajoConsumidor(token: IToken, idTrabajo: string): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/es-mi-trabajo-consumidor`, { ...token, idTrabajo });
  }

  public esMiTrabajoPrestador(token: IToken, idTrabajo: string): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/es-mi-trabajo-prestador`, { ...token, idTrabajo });
  }

  public patchTrabajoEstado(idTrabajo: string, token: IToken, estadoId: string): Observable<any> {
    return this._httpClient.patch<any>(`${this.urlBase}/trabajo-estado/${idTrabajo}`, { ...token, estadoId });
  }

  public patchTrabajoPrestadorAsignado(idTrabajo: string, token: IToken, prestadorId: string): Observable<any> {
    return this._httpClient.patch<any>(`${this.urlBase}/trabajo-prestador-asignado/${idTrabajo}`, { ...token, prestadorId });
  }

  public postCalificacion(idTrabajo: string, token: IToken, estrellas: number, comentario?: string): Observable<any> {
    return this._httpClient.patch<any>(`${this.urlBase}/trabajo-calificacion/${idTrabajo}`, { ...token, estrellas, comentario });
  }

}
