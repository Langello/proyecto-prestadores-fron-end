
import { Component, OnInit } from '@angular/core';
import { ITrabajo } from 'src/app/models/trabajo';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})


export class JobsComponent implements OnInit {
  listaTrabajos: ITrabajo[] = [];
  loading: boolean = true;

  constructor(private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
    
    this._apiService.getTrabajos("").subscribe({
      next: (data: ITrabajo[]) => {
        console.log(data);
        this.listaTrabajos = data;
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = "No hay trabajos disponibles";
        document.body.appendChild(alertElement);
        console.error(error);
        this.loading = false;
        setTimeout(() => {
          alertElement.remove();
        }, 4000);

      }
    });

    this._apiService.textObserved.subscribe({
      next: (text: string) => {
        this.loading = true;
        this._apiService.getTrabajos(text).subscribe({
          next: (data: ITrabajo[]) => {
            if (data.length == 0) {
              const alertElement = document.createElement('div');
              alertElement.className = 'alert alert-warning container text-center fs-5  mt-1 mx-auto';
              alertElement.innerText = "No se encontraron resultados";
              document.body.appendChild(alertElement);
              setTimeout(() => {
                alertElement.remove();
              }, 4000);
            }
            this.listaTrabajos = data;
            this.loading = false;
          },
          error: (error: any) => {
            const alertElement = document.createElement('div');
            alertElement.className = 'alert alert-warning container text-center fs-5';
            alertElement.innerText = error.error.msg || "No se encontraron resultados";
            document.body.appendChild(alertElement);
            console.error(error);
            this.loading = false;
          }
        });
      }
    })
  }

}