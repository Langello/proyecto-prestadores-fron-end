import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IToken } from 'src/app/models/token';


@Component({
  selector: 'app-postular',
  templateUrl: './postular.component.html',
  styleUrls: ['./postular.component.css']
})



export class PostularComponent implements OnInit {
  contratarForm!: FormGroup;
  loading: boolean = false;
  textModal: string = '';
  token: IToken = {
    token: localStorage.getItem('token') || ''
  }


  constructor(
    private _apiService: ApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.contratarForm = this.fb.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
    })
  }

  onSubmit(contratarForm: FormGroup) {
    this.loading = true;
    const asunto = contratarForm.get('asunto')?.value;
    const mensaje = contratarForm.get('mensaje')?.value;
    const idDestino = parseInt(window.location.pathname.split('/')[2]);
    

    this._apiService.postMensajeAConsumidor(asunto, mensaje, idDestino, this.token).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.textModal = data.msg;
      },
      error: (error: any) => {
        console.error(error);
        this.textModal = error.error.msg;
        this.loading = false;
      }
    });
  }
}
