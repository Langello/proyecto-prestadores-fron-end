import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IPrestador } from 'src/app/models/prestador';

@Component({
  selector: 'app-profesional-detalle',
  templateUrl: './profesional-detalle.component.html',
  styleUrls: ['./profesional-detalle.component.css']
})
export class ProfesionalDetalleComponent implements OnInit {


  loading: boolean = false;
  id: string = '';
  prestador: IPrestador = {
    cuilCuit: '',
    descripcion: '',
    fotosTrabajosRealizados: '',
    horariosAtencion: '',
    disponibilidad: false,
    radioCobertura: '',
    usuario: null,
    id: ''
  }

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.id = window.location.pathname.split('/')[2];
    this._apiService.getPrestador(this.id).subscribe({
      next: (data: IPrestador) => {
        this.prestador = data;
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = "No hay prestadores registrados";
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
