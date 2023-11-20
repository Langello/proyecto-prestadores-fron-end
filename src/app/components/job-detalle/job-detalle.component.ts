
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ITrabajo } from 'src/app/models/trabajo';

@Component({
  selector: 'app-job-detalle',
  templateUrl: './job-detalle.component.html',
  styleUrls: ['./job-detalle.component.css']
})

export class JobDetalleComponent implements OnInit {


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
    estadoId: null,
    calificacionId: null
  }

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = window.location.pathname.split('/')[2];
    this._apiService.getTrabajo(this.id).subscribe({
      next: (data: ITrabajo) => {
        this.trabajo = data;
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
  }

}
