import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IUsuario } from 'src/app/models/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuarioForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _apiService: ApiService
    ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      document.getElementById('password')?.setAttribute('type', 'text');
    }

    if (!this.showPassword) {
      document.getElementById('password')?.setAttribute('type', 'password');
    }
  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)]],
      dni: ['', Validators.required],
      tipoDni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    
  

    // Obtener el formulario
    const formulario = document.getElementById('usuarioForm');

    // Agregar el evento submit al formulario
    formulario?.addEventListener('submit', (event) => {
      // Prevenir el comportamiento predeterminado de envío del formulario
      event.preventDefault();

      // Obtener los valores de los campos del formulario
      const nombre = (document.getElementById('nombre') as HTMLInputElement)
        .value;
      const apellido = (document.getElementById('apellido') as HTMLInputElement)
        .value;
      const email = (document.getElementById('email') as HTMLInputElement)
        .value;
      const password = (document.getElementById('password') as HTMLInputElement)
        .value;
      const dni = (document.getElementById('dni') as HTMLInputElement).value;
      const tipoDni = (document.getElementById('tipo-dni') as HTMLSelectElement)
        .value;
      const fechaNacimiento = (
        document.getElementById('fecha-nacimiento') as HTMLInputElement
      ).value;
      const telefono = (document.getElementById('telefono') as HTMLInputElement)
        .value;

      // Enviar los datos al servidor
      
      this._apiService
        .postUsuario({
          id: '',
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
          dni: dni,
          tipoDni: tipoDni,
          fechaNacimiento: fechaNacimiento,
          telefono: telefono,
          fotoPerfil: '',
        })
        .subscribe({
          next: (data: IUsuario) => {
            console.log(data);
            localStorage.setItem('idUsuario', data.id);
            this._router.navigate(['/modal-select']);
          },
          error: (error: any) => {
            console.error(error);
            alert(error.error.msg);
          },
        });
    });
  }

  registrar() {
    this._router.navigate(['/modal-select']);
  }
}