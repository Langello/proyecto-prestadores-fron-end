import { Component, OnInit } from '@angular/core';
import { ITrabajo } from 'src/app/models/trabajo';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-my-profile-consumidor',
  templateUrl: './my-profile-consumidor.component.html',
  styleUrls: ['./my-profile-consumidor.component.css']
})
export class MyProfileConsumidorComponent implements OnInit {
  listaTrabajos: ITrabajo[] = [];
  loading: boolean = true;

  constructor(private _apiService: ApiService,
  ) { }

  ngOnInit(): void {
    document.body.style.overflowY = 'scroll';
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
  }
}
