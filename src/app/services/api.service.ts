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
    return this._httpClient.get<IConsumidor>(`${this.urlBase}/consumidor/${id}`);
  }

  public getUsuario(token: string): Observable<IUsuario> {
    return this._httpClient.get<IUsuario>(`${this.urlBase}/usuario/${token}`);
  }

  public postUsuario(usuario: IUsuario): Observable<IToken> {
    return this._httpClient.post<IToken>(`${this.urlBase}/usuario`, usuario);
  }

  public putUsuario(token: string, usuario: IUsuario): Observable<any> {
    return this._httpClient.put<any>(`${this.urlBase}/usuario`, { ...usuario, token });
  }

  public login(email: string, password: string): Observable<IToken> {
    return this._httpClient.post<IToken>(`${this.urlBase}/login`, { email, password });
  }

  public postPrestador(prestador: IPrestador, token: string): Observable<IPrestador> {
    return this._httpClient.post<IPrestador>(`${this.urlBase}/prestador`, { ...prestador, token });
  }

  public postConsumidor(consumidor: IConsumidor, token: any): Observable<IConsumidor> {
    return this._httpClient.post<IConsumidor>(`${this.urlBase}/consumidor`, { ...consumidor, token });
  }
  public postMensajeAPrestador(asunto: string, mensaje: string, idDestino: string, token: string): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/mensaje-a-prestador`, { asunto, mensaje, idDestino, token });
  }

  public postMensajeAConsumidor(asunto: string, mensaje: string, idDestino: string, token: string): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/mensaje-a-consumidor`, { asunto, mensaje, idDestino, token });
  }

  public getMensajeConsumidorRecibido (token: string): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-consumidor-recibido/${token}`);
  }

  public getMensajePrestadorRecibido (token: string): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-prestador-recibido/${token}`);
  }

  public getMensajePrestadorEnviado (token: string): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-prestador-enviado/${token}`);
  }

  public getMensajeConsumidorEnviado (token: string): Observable<any> {
    return this._httpClient.get<any>(`${this.urlBase}/mensaje-consumidor-enviado/${token}`);
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

  public getTrabajosByConsumidor(token : string): Observable<ITrabajo[]> {
    return this._httpClient.get<ITrabajo[]>(`${this.urlBase}/trabajo-consumidor/${token}`);
  }

  public getTrabajosByPrestador(token : string): Observable<ITrabajo[]> {
    return this._httpClient.get<ITrabajo[]>(`${this.urlBase}/trabajo-prestador/${token}`);
  }

  public postTrabajo(trabajo: ITrabajo, token: string): Observable<ITrabajo> {
    return this._httpClient.post<ITrabajo>(`${this.urlBase}/trabajo`, { ...trabajo, token });
  }

}
