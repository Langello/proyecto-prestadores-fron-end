import { Component, OnInit } from '@angular/core';
import { ITrabajo } from 'src/app/models/trabajo';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IConsumidor } from 'src/app/models/consumidor';
import { Router } from '@angular/router';
import { IToken } from 'src/app/models/token';


@Component({
  selector: 'app-my-profile-consumidor',
  templateUrl: './my-profile-consumidor.component.html',
  styleUrls: ['./my-profile-consumidor.component.css']
})
export class MyProfileConsumidorComponent implements OnInit {
  listaTrabajos: ITrabajo[] = [];
  mensajesEnviados: any[] = [];
  mensajesRecibidos: any[] = [];
  loading: boolean = true;
  token: IToken = {
    token: localStorage.getItem('token') || ''
  }
  publicarForm!: FormGroup;
  idConsumidor: string = '';
  consumidor!: IConsumidor;
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

    this._apiService.getTrabajosByConsumidor(this.token).subscribe({
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

    this._apiService.getMensajeConsumidorRecibido(this.token).subscribe({
      next: (data: any) => {
        this.mensajesRecibidos = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      }
    })

    this._apiService.getMensajeConsumidorEnviado(this.token).subscribe({
      next: (data: any) => {
        this.mensajesEnviados = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
      }
    })

    this._apiService.getConsumidorIdByToken(this.token).subscribe({
      next: (data: any) => {
        this.idConsumidor = data;
        this._apiService.getConsumidor(this.idConsumidor).subscribe({
          next: (data: IConsumidor) => {
            this.consumidor = data;
            this.cuentaForm = this.fb.group({
              metodoPago: [data.metodoPago, Validators.required],
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

        this._apiService.getTrabajosByConsumidor(this.token).subscribe({
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

  guardarCuenta() {
    this._apiService.putConsumidor(this.token, this.cuentaForm.value,).subscribe({
      next: (data: any) => {
        this._router.navigate(['/my-profile-consumer']);
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-success container text-center fs-5 mt-1 mx-auto w-50';
        alertElement.innerText = data.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 4000);
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

  borrarMensajeRecibido(id: string) {
    this.loading = true;
    window.scrollTo(0, 0);
    this._apiService.deleteTrabajoConsumidorRecibido(id, this.token).subscribe({
      next: (data: any) => {
        this.ngOnInit();
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-success container text-center fs-5 mt-1 mx-auto w-50';
        alertElement.innerText = data.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 4000);
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

  borrarMensajeEnviado(id: string) {
    this.loading = true;
    window.scrollTo(0, 0);
    this._apiService.deleteTrabajoConsumidorEnviado(id, this.token).subscribe({
      next: (data: any) => {
        this.ngOnInit();
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-success container text-center fs-5 mt-1 mx-auto w-50';
        alertElement.innerText = data.msg;
        document.getElementById('alert')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        }, 4000);
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