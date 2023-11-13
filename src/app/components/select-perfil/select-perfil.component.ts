import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-select-perfil',
  templateUrl: './select-perfil.component.html',
  styleUrls: ['./select-perfil.component.css']
})
export class SelectPerfilComponent implements OnInit {

  constructor(private router: Router , private fb: FormBuilder) { }

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

    const idUsuario = localStorage.getItem('idUsuario');
    const formularioConsumidor = document.getElementById('consumidorForm');
    formularioConsumidor?.addEventListener('submit', (event) => {
      event.preventDefault();

      const metodoPago = (document.getElementById('metodoPago') as HTMLSelectElement).value;

      axios.post('http://localhost:3050/consumidor/' + idUsuario, {
        metodo_pago: metodoPago
      }).then((response) => {
        console.log(response.data);
        this.router.navigate(['/sing-in']);
      }).catch((error) => {
        alert(error.response.data.msg);
        console.log(error);
      });
    })

    const formularioPrestador = document.getElementById('prestadorForm');
    formularioPrestador?.addEventListener('submit', (event) => {
      event.preventDefault();
      const cuil_cuilt = (document.getElementById('cuilCuit') as HTMLInputElement).value;
      const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
      const fotos_trabajos_realizados = (document.getElementById('fotosTrabajos') as HTMLInputElement).value;
      const horarios_atencion = (document.getElementById('horariosAtencion') as HTMLInputElement).value;
      const disponibilidad = (document.getElementById('disponibilidad') as HTMLInputElement).value;
      const radio_cobertura = (document.getElementById('radioCobertura') as HTMLInputElement).value;

      axios.post('http://localhost:3050/prestador/' + idUsuario, {
        cuil_cuit: cuil_cuilt,
        descripcion: descripcion,
        fotos_trabajos_realizados: fotos_trabajos_realizados,
        horarios_atencion: horarios_atencion,
        disponibilidad: disponibilidad,
        radio_cobertura: radio_cobertura
      })
        .then((response) => {
          console.log(response.data);
          this.router.navigate(['/sing-in']); //cambiar a pantala de perfil de prestador
        })
        .catch((error) => {
          alert(error.response.data.msg);
          console.log(error);
        })

    })
  }

}

