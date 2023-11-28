import { Component, OnInit } from '@angular/core';
import { ITrabajo } from 'src/app/models/trabajo';
import { IPrestador } from 'src/app/models/prestador';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IToken } from 'src/app/models/token';


@Component({
  selector: 'app-my-profile-prestador',
  templateUrl: './my-profile-prestador.component.html',
  styleUrls: ['./my-profile-prestador.component.css']
})


export class MyProfilePrestadorComponent implements OnInit {
  listaTrabajos: ITrabajo[] = [];
  mensajesEnviados: any[] = [];
  mensajesRecibidos: any[] = [];
  loading: boolean = true;
  token: IToken = {
    token: localStorage.getItem('token') || ''
  }
  publicarForm!: FormGroup;
  prestadorId: string = '';
  prestador!: IPrestador;
  cuentaForm!: FormGroup;

  constructor(private _apiService: ApiService,
    private fb: FormBuilder,
    private _router: Router

  ) { }

  ngOnInit(): void {
    

    this.publicarForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required],
      rangoHorario: ['', Validators.required],
      tareas: ['', Validators.required]
    })

    this._apiService.getTrabajosByPrestador(this.token).subscribe({
      next: (data: ITrabajo[]) => {
        this.listaTrabajos = data;
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5 mt-1 mx-auto w-50';
        alertElement.innerText = "No hay trabajos disponibles";
        document.getElementById('alert')?.appendChild(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

      }
    });

    this._apiService.getMensajePrestadorRecibido(this.token).subscribe({
      next: (data: any) => {
        this.mensajesRecibidos = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      }
    })

    

    this._apiService.getPrestadorIdByToken(this.token).subscribe({
      next: (data: any) => {
        this.prestadorId = data;
        this._apiService.getPrestador(this.prestadorId).subscribe({
          next: (data: any) => {
            this.prestador = data;
            this.cuentaForm = this.fb.group({
              cuilCuit: [data.cuilCuit, Validators.required],
              descripcion: [ data.descripcion, Validators.required],
              fotosTrabajosRealizados: [ data.fotosTrabajosRealizados, Validators.required],
              horariosAtencion: [ data.horariosAtencion, Validators.required],
              disponibilidad: [ data.disponibilidad, Validators.required],
              radioCobertura: [ data.radioCobertura, Validators.required],
            })
            this.loading = false;
          },
          error: (error: any) => {
            console.error(error);
          }
        })
      },
      error: (error: any) => {
        console.error(error);
      }
    })

    this._apiService.getMensajePrestadorEnviado(this.token).subscribe({
      next: (data: any) => {
        this.mensajesEnviados = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }

  publicar() {
    this._apiService.postTrabajo(this.publicarForm.value, this.token).subscribe({
      next: (data: any) => {
        this._router.navigate(['/my-profile-consumer']);
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-success container text-center fs-5 mt-1 mx-auto w-50';
        alertElement.innerText = data.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

        this._apiService.getTrabajosByPrestador(this.token).subscribe({
          next: (data: ITrabajo[]) => {
            this.listaTrabajos = data;
            this.loading = false;
          },
          error: (error: any) => {
            const alertElement = document.createElement('div');
            alertElement.className = 'alert alert-warning container text-center fs-5 mt-1 mx-auto w-50';
            alertElement.innerText = "No hay trabajos disponibles";
            document.getElementById('alert')?.appendChild(alertElement);
            console.error(error);
            this.loading = false;
            setTimeout(() => {
              alertElement.remove();
            }, 4000);
          }
        });
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5 mt-1 mx-auto w-50';
        alertElement.innerText = error.error.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);
      }
    });

  }

}
