import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IConsumidor } from 'src/app/models/consumidor';
import { IPrestador } from 'src/app/models/prestador';



@Component({
  selector: 'app-select-perfil',
  templateUrl: './select-perfil.component.html',
  styleUrls: ['./select-perfil.component.css']
})



export class SelectPerfilComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private _apiService: ApiService) { }

  prestadorForm!: FormGroup;
  consumidorForm!: FormGroup;
  loading: boolean = false;


  ngOnInit(): void {

    this.prestadorForm = this.fb.group({
      cuilCuit: ['', Validators.required],
      descripcion: ['', Validators.required],
      horarioAtencion: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      radioCobertura: ['', Validators.required],
    })

    this.consumidorForm = this.fb.group({
      metodoPago: ['', Validators.required],
    })

    const idUsuario = localStorage.getItem('idUsuario') || '';

    const formularioConsumidor = document.getElementById('consumidorForm');

    formularioConsumidor?.addEventListener('submit', (event) => {
      event.preventDefault();

      this.loading = true;

      const metodoPago = (document.getElementById('metodoPago') as HTMLSelectElement).value;


      this._apiService.postConsumidor({ metodoPago: metodoPago, usuario: null }, idUsuario).subscribe({
        next: (data: IConsumidor) => {
          this.loading = false;
          const modal = document.getElementById('consumidorModal');
          if (modal) {
            // agregar el atributo data-bs-dismiss con valor 'modal'
            modal.setAttribute('data-bs-dismiss', 'modal');
            // cerrar el modal
            modal.click();
          }
          // redirigir a la vista de prestadores
          this.router.navigate(['/prestadores']);
        }
        , error: (error: any) => {
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-warning';
          alertElement.innerText = error.error.msg;
          document.getElementById('consumidorForm')?.prepend(alertElement);
          console.error(error);
          this.loading = false;

          setTimeout(() => {
            alertElement.remove();
          }, 4000);
        }
      })
    });

    const formularioPrestador = document.getElementById('prestadorForm');
    formularioPrestador?.addEventListener('submit', (event) => {

      event.preventDefault();

      this.loading = true;

      const cuilCuit = (document.getElementById('cuilCuit') as HTMLInputElement).value;
      const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
      const fotosTrabajosRealizados = (document.getElementById('fotosTrabajos') as HTMLInputElement).value;
      const horariosAtencion = (document.getElementById('horariosAtencion') as HTMLInputElement).value;
      const disponibilidad = Boolean((document.getElementById('disponibilidad') as HTMLInputElement).value);
      const radioCobertura = (document.getElementById('radioCobertura') as HTMLInputElement).value;

      this._apiService.postPrestador({ cuilCuit, descripcion, fotosTrabajosRealizados, horariosAtencion, disponibilidad, radioCobertura, usuario: null }, idUsuario).subscribe({
        next: (data: IPrestador) => {
          this.loading = false;
          const modal = document.getElementById('prestadorModal');
          if (modal) {
            // agregar el atributo data-bs-dismiss con valor 'modal'
            modal.setAttribute('data-bs-dismiss', 'modal');
            // cerrar el modal
            modal.click();
          }
          this.router.navigate(['/prestadores']);
        }
        , error: (error: any) => {
          const alertElement = document.createElement('div');
          alertElement.className = 'alert alert-warning';
          alertElement.innerText = error.error.msg;
          document.getElementById('prestadorForm')?.prepend(alertElement);
          console.error(error);
          this.loading = false;
          setTimeout(() => {
            alertElement.remove();
          }, 4000);
        }
      })
    })
  }



}

