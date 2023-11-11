import { Component } from '@angular/core';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent {
  tarjetas: number[] = Array(15).fill(5)
}