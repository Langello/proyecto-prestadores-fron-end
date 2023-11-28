import { Component, OnInit } from '@angular/core';
import { IPrestador } from 'src/app/models/prestador';
import { ApiService } from 'src/app/services/api.service';





@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {
  listaPrestadores: IPrestador[] = [];
  loading: boolean = true;

  constructor(private _apiService: ApiService,
  ) { }

  ngOnInit(): void {

    this._apiService.getPrestadores("").subscribe({
      next: (data: IPrestador[]) => {
        this.listaPrestadores = data;
        for (let i = 0; i < this.listaPrestadores.length; i++) {
          this._apiService.getPromedioCalificacionPrestador(this.listaPrestadores[i].id).subscribe({
            next: (data: number) => {
              this.listaPrestadores[i].promedioCalificacion = data;
              this.listaPrestadores.sort((a, b) => (b.promedioCalificacion ?? 0) - (a.promedioCalificacion ?? 0));
            },
            error: (error: any) => {
              console.error(error);
            }
          });
        }
        this.loading = false;
      },
      error: (error: any) => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert alert-warning container text-center fs-5';
        alertElement.innerText = "No hay prestadores registrados";
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
        this._apiService.getPrestadores(text).subscribe({
          next: (data: IPrestador[]) => {
            this.listaPrestadores = data;
            for (let i = 0; i < data.length; i++) {
              this._apiService.getPromedioCalificacionPrestador(data[i].id).subscribe({
                next: (data: number) => {
                  this.listaPrestadores[i].promedioCalificacion = data;
                  this.listaPrestadores.sort((a, b) => (b.promedioCalificacion ?? 0) - (a.promedioCalificacion ?? 0));
                },
                error: (error: any) => {
                  console.error(error);
                }
              });
            }
            if (data.length == 0) {
              const alertElement = document.createElement('div');
              alertElement.className = 'alert alert-warning container text-center fs-5  mt-1 mx-auto';
              alertElement.innerText = "No se encontraron resultados";
              document.body.appendChild(alertElement);
              setTimeout(() => {
                alertElement.remove();
              }, 4000);
            }
            this.listaPrestadores = data;
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