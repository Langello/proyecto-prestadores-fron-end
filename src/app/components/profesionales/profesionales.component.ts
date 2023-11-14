import { Component, OnInit } from '@angular/core';
import { IPrestador } from 'src/app/models/prestador';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {
  listaPrestadores: IPrestador[] = [];
  loading: boolean = true;

  constructor(private _apiService: ApiService , private _router: Router) { }

  ngOnInit(): void {
    this._apiService.getPrestadores().subscribe({
      next: (data: IPrestador[]) => {
        this.listaPrestadores = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.loading = false;
      }
    });
    
  }

  
}