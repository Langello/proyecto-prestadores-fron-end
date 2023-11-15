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

      const metodoPago = (document.getElementById('metodoPago') as HTMLSelectElement).value;


      this._apiService.postConsumidor({ metodo_pago: metodoPago, usuario: null }, idUsuario).subscribe({
        next: (data: IConsumidor) => {
          this.router.navigate(['/home']);
        }
        , error: (error: any) => {
          alert(error.error.msg);
          console.error(error);
        }
      })
    });

    const formularioPrestador = document.getElementById('prestadorForm');
    formularioPrestador?.addEventListener('submit', (event) => {
      event.preventDefault();
      const cuil_cuit = (document.getElementById('cuilCuit') as HTMLInputElement).value;
      const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
      const fotos_trabajos_realizados = (document.getElementById('fotosTrabajos') as HTMLInputElement).value;
      const horarios_atencion = (document.getElementById('horariosAtencion') as HTMLInputElement).value;
      const disponibilidad = Boolean((document.getElementById('disponibilidad') as HTMLInputElement).value);
      const radio_cobertura = (document.getElementById('radioCobertura') as HTMLInputElement).value;

      this._apiService.postPrestador({ cuil_cuit, descripcion, fotos_trabajos_realizados, horarios_atencion, disponibilidad, radio_cobertura, usuario: null }, idUsuario).subscribe({
        next: (data: IPrestador) => {
          this.router.navigate(['/home']);
        }
        , error: (error: any) => {
          alert(error.error.msg);
          console.error(error);
        }
      })
    })
  }



}

