import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IToken } from 'src/app/models/token';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuarioForm!: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _apiService: ApiService
  ) { }

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

      this.loading = true;

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
          next: (data: IToken) => {
            localStorage.setItem('token', data.token);
            this._router.navigate(['/modal-select']);
            this.loading = false;
          },
          error: (error: any) => {
            const alertElement = document.createElement('div');
            alertElement.className = 'alert alert-warning';
            alertElement.innerText = error.error.msg;
            document.getElementById('usuarioForm')?.prepend(alertElement);
            scrollTo(0, 0);
            console.error(error);
            this.loading = false;

            setTimeout(() => {
              alertElement.remove();
            }, 4000);
          },
        });
    });
  }
}