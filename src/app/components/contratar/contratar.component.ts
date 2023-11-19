import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.css']
})
export class ContratarComponent implements OnInit {
  contratarForm!: FormGroup;
  loading: boolean = false;
  textModal: string = '';


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
    const idDestino = window.location.pathname.split('/')[2];
    const token = localStorage.getItem('token') || '';

    this._apiService.postMensajeAPrestador(asunto, mensaje, idDestino, token).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.textModal = data.msg;
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

}
