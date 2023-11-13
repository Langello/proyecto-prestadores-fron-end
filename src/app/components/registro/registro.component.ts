import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuarioForm!: FormGroup; 

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s]).+$'), Validators.minLength(8)]],
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
      axios
        .post('http://localhost:3050/usuario', {
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
          dni: dni,
          telefono: telefono,
          tipo_dni: tipoDni,
          foto_perfil: '',
          fecha_nacimiento: fechaNacimiento,
        })
        .then((response) => {
          console.log(response.data);
          const idUsuario = response.data.id;
          localStorage.setItem('idUsuario', idUsuario);
          this.registrar();
        })
        .catch((error) => {
          alert('Error al registrar el usuario: ' + error.response.data.msg);
          console.log(error);
        });
    });
  }

  registrar() {
    this.router.navigate(['/modal-select']);
  }
}