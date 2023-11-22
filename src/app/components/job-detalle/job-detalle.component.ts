
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ITrabajo } from 'src/app/models/trabajo';
import { IToken } from 'src/app/models/token';

@Component({
  selector: 'app-job-detalle',
  templateUrl: './job-detalle.component.html',
  styleUrls: ['./job-detalle.component.css'],

})

export class JobDetalleComponent implements OnInit {

  token: IToken = {
    token: localStorage.getItem('token') || ''
  }
  loading: boolean = false;
  id: string = '';
  trabajo: ITrabajo = {
    id: '',
    nombre: '',
    fecha: '',
    lugar: '',
    rangoHorario: '',
    prestadorId: null,
    consumidorId: 0,
    tareas: '',
    estado: {
      id: 0,
      nombre: ''
    },
    calificacionId: null,
  }
  trabajoDisponible!: boolean
  trabajoEstado!: boolean

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = window.location.pathname.split('/')[2];
    this._apiService.getTrabajo(this.id).subscribe({
      next: (data: ITrabajo) => {
        this.trabajo = data;
        if (this.trabajo.estado.id == 6) {
          this.trabajoDisponible = true;
        }
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = error.error.msg;
        document.body.appendChild(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

      }
    });

    this._apiService.getTrabajosByConsumidor(this.token).subscribe({
      next: (data: ITrabajo[]) => {
        if (data.length > 0) {
          this.trabajoEstado = true;
        }
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = error.error.msg;
        document.body.appendChild(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

      }
    })

    this._apiService.esMiTrabajoConsumidor(this.token, this.id).subscribe({
      next: (data: any) => {
        this.trabajoEstado = data.msg
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = error.error.msg;
        document.body.prepend(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

      }
    })
  }

  goBack() {
    window.history.back();
  }

}
