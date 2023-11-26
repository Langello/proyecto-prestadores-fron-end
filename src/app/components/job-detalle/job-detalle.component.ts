
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ITrabajo } from 'src/app/models/trabajo';
import { IToken } from 'src/app/models/token';
import { ICalificacion } from 'src/app/models/calificacion';

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
    calificacione: {
      id: 0,
      estrellas: 0,
      comentario: ''
    }
  }
  trabajoDisponible!: boolean
  trabajoEsMioConsumidor!: boolean
  trabajoEsMioPrestador!: boolean
  trabajoNuevoEstado!: string
  formAsignarPrestador!: FormGroup
  formDarCalificacion!: FormGroup
  mostrarAsignarPrestador: boolean = false
  mostrarDarCalificacion: boolean = false
  idPrestadorAsignado: string = ''
  

  constructor(
    private _apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.formAsignarPrestador = this.fb.group({
    }),
    this.formDarCalificacion = this.fb.group({
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.id = window.location.pathname.split('/')[2];
    this._apiService.getTrabajo(this.id).subscribe({
      next: (data: ITrabajo) => {
        this.trabajo = data;
        if (this.trabajo.estado.nombre == 'Publicado') {
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


    this._apiService.esMiTrabajoConsumidor(this.token, this.id).subscribe({
      next: (data: any) => {
        this.trabajoEsMioConsumidor = data.msg
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

    this._apiService.esMiTrabajoPrestador(this.token, this.id).subscribe({
      next: (data: any) => {
        this.trabajoEsMioPrestador = data.msg
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      }
    })

  }

  goBack() {
    window.history.back();
  }

  mostrarForm() {
    this.trabajoNuevoEstado = (<HTMLSelectElement>document.getElementById('estadoTrabajoNuevo')).value;
    if (this.trabajoNuevoEstado == '1') {
      this.mostrarAsignarPrestador = true;
      this.formAsignarPrestador = this.fb.group({
        prestadorId: ['', Validators.required]
      })
    } else {
      this.formAsignarPrestador = this.fb.group({
        prestadorId: ['']
      })
      this.mostrarAsignarPrestador = false;
    }
    if (this.trabajoNuevoEstado == '5') {
      this.mostrarDarCalificacion = true;
      this.formDarCalificacion = this.fb.group({
        estrellas: ['', Validators.required],
        comentario: ['']
      })
    } else {
      this.mostrarDarCalificacion = false;
    }
  }
  cambiarEstado() {
    this.trabajoNuevoEstado = (<HTMLSelectElement>document.getElementById('estadoTrabajoNuevo')).value;
    this.loading = true;
    this._apiService.patchTrabajoEstado(this.id, this.token, this.trabajoNuevoEstado).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          scrollTo(0, 0);
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-success container text-center fs-5';
          alertElement.innerText = data.msg;
          document.getElementById('alert')?.appendChild(alertElement);
        }, 3000);
        this.ngOnInit();
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = error.error.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

      }
    })
  }

  asignarPrestador() {
    this.idPrestadorAsignado = (<HTMLSelectElement>document.getElementById('prestador')).value;

    this._apiService.patchTrabajoPrestadorAsignado(this.id, this.token, this.idPrestadorAsignado).subscribe({
      next: (data: any) => {
        
        setTimeout(() => {
          scrollTo(0, 0);
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-success container text-center fs-5';
          alertElement.innerText = data.msg;
          document.getElementById('alert')?.appendChild(alertElement);
        }, 3000);
        this.cambiarEstado();
      },
      error: (error: any) => {
        scrollTo(0, 0);
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = error.error.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 5000);

      }
    })
  }

  darCalificacion() {
    const estrellas = Number((<HTMLSelectElement>document.getElementById('darCalificacion')).value);
    const comentario = (<HTMLInputElement>document.getElementById('comentario')).value;

    this._apiService.postCalificacion(this.id, this.token, estrellas, comentario).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          scrollTo(0, 0);
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-success container text-center fs-5';
          alertElement.innerText = data.msg;
          document.getElementById('alert')?.appendChild(alertElement);
        }, 3000);
        this.cambiarEstado();
      },
      error: (error: any) => {
        scrollTo(0, 0);
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = error.error.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 5000);

      }
    })
  }

}

