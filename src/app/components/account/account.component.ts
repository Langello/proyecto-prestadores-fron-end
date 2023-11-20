import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IUsuario } from 'src/app/models/usuario';
import { IToken } from 'src/app/models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent  implements OnInit {
  nombre!: string;
  apellido!: string;
  telefono!: string;
  contraseña!: string;
  edicionHabilitada: boolean = false;
  usuarioForm!: FormGroup;
  showPassword: boolean = false;
  loading: boolean = true;
  usuario!: IUsuario;
  token!: IToken;
  loading1: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private _router: Router
  ) { }
  

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (!token) {
      this._router.navigate(['/login']);
      return;
    }
    this._apiService.getUsuario(token).subscribe({
      next: (data: IUsuario) => {
        this.usuario = data;
        this.loading = false;
        this.usuarioForm.patchValue({
          nombre: data.nombre,
          apellido: data.apellido,
          email: data.email,
          dni: data.dni,
          tipoDni: data.tipoDni,
          fechaNacimiento: data.fechaNacimiento,
          telefono: data.telefono
        })
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    })


    this.usuarioForm = this.fb.group({
      nombre: [, Validators.required],
      apellido: [, Validators.required],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/)]],
      dni: [, Validators.required],
      tipoDni: [, Validators.required],
      fechaNacimiento: [, Validators.required],
      telefono: [, Validators.required],
    });
  }


  guardar() {

    
    this.loading = true;

    const token = localStorage.getItem('token');

    if (!token) {
      this._router.navigate(['/login']);
      return;
    }

    this._apiService.putUsuario(token, this.usuarioForm.value).subscribe({
      next: (data) => {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', 'alert-success', 'container', 'text-center', 'fs-5', 'mt-1', 'mx-auto', 'w-50');
        alertElement.innerText = data.msg;
        document.getElementById('title')?.appendChild(alertElement);
        setTimeout(() => {
          alertElement.remove();
        } , 4000);
        this.loading = false;
      },
      error: (error) => {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert', 'alert-warning');
        alertElement.innerText = error.error.msg;
        document.getElementById('usuarioForm')?.prepend(alertElement);

        setTimeout(() => {
          alertElement.remove();
        } , 4000);
        this.loading = false;
      }
    })
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

    if (this.showPassword) {
      document.getElementById('password')?.setAttribute('type', 'text');
    }

    if (!this.showPassword) {
      document.getElementById('password')?.setAttribute('type', 'password');
    }
  }
}
