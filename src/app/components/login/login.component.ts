import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IToken } from 'src/app/models/token';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  loading: boolean = false;



  constructor(private router: Router, private fb: FormBuilder, private _apiService: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email],],
      password: ['', Validators.required],
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

  login() {
    this.loading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this._apiService.login(email, password).subscribe({
      next: (data: IToken) => {
        localStorage.setItem('token', data.token);
        this._apiService.getRoles(data).subscribe({
          next: (data: any) => {
            if (data.usuario) {
              this.router.navigate(['/modal-select']);
            }
            if (data.consumidor) {
              this.router.navigate(['/prestadores']);
            }
            if (data.prestador) {
              this.router.navigate(['/trabajos']);
            }
          },
          error: (error: any) => {
            console.error(error);
          }
        });
        this.loading = false;
        

      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning';
        alertElement.innerText = error.error.msg;
        document.getElementById('loginForm')?.prepend(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);
      }
    })
  }

}
