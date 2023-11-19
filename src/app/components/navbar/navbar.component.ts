import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IToken } from 'src/app/models/token';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    cuenta: boolean = false;
    listaPrestadores: boolean = false;
    listaTrabajos: boolean = false;
    cerrarSesion: boolean = false;
    iniciarSesion: boolean = false;
    registrarse: boolean = false;
    perfilConsumidor: boolean = false;
    perfilPrestador: boolean = false;
    token!: IToken;
    

  constructor(
    private _apiService: ApiService,
    private _router: Router
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.iniciarSesion = false;
      this.registrarse = false;
      this.token = {
        token: localStorage.getItem('token') || ''
      };

      this._apiService.getRoles(this.token).subscribe({
        next: (data: any) => {
          if (data.usuario) {
            this.cuenta = true;
            this.cerrarSesion = true;
          }
          if (data.prestador) {
            this.perfilPrestador = true;
            this.listaTrabajos = true;
          }
          if (data.consumidor) {
            this.listaPrestadores = true;
            this.perfilConsumidor = true;
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      })
    }

    if (!localStorage.getItem('token')) {
      this.iniciarSesion = true;
      this.registrarse = true;
    }

    
  }

  getRoles(token: IToken) {
    this._apiService.getRoles(token).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/sing-in']);
  }
}
