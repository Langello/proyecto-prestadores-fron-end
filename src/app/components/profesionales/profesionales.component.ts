import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {
  data: any;

  ngOnInit() {
    this.getPrestadores();
  }

  getPrestadores() {
    axios
      .get('http://localhost:3050/prestador')
      .then(response => {
        this.data = response.data;
        console.log(this.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}