import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPrestador } from '../models/prestador';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../models/usuario';
import { IToken } from '../models/token';
import { IConsumidor } from '../models/consumidor';

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

  public getUsuario(id: string | null): Observable<IUsuario> {
    return this._httpClient.get<IUsuario>(`${this.urlBase}/usuario/${id}`);
  }

  public postUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this._httpClient.post<IUsuario>(`${this.urlBase}/usuario`, usuario);
  }

  public login(email: string, password: string): Observable<IToken> {
    return this._httpClient.post<IToken>(`${this.urlBase}/login`, { email, password });
  }

  public postPrestador(prestador: IPrestador, id: string): Observable<IPrestador> {
    return this._httpClient.post<IPrestador>(`${this.urlBase}/prestador/${id}`, prestador);
  }

  public postConsumidor(consumidor: IConsumidor, id: string): Observable<IConsumidor> {
    return this._httpClient.post<IConsumidor>(`${this.urlBase}/consumidor/${id}`, consumidor);
  }

  public postMensajeAPrestador(asunto: string, mensaje: string, idDestino: string, token: string ): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/mensaje-a-prestador`, { asunto, mensaje, idDestino, token});
  }

  public getRoles(token: IToken): Observable<any> {
    return this._httpClient.post<any>(`${this.urlBase}/roles`, token);
  }

  
}
