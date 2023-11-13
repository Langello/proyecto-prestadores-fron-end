import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  

  constructor(private router: Router , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
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
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    

    axios.post('http://localhost:3050/login', {
      email: email,
      password: password
    })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.log(error);
      });
  }

}
