import { Component, OnInit } from '@angular/core';
import * as type from '../../../../../environments/golbals';
@Component({
  selector: 'app-alumno-home',
  templateUrl: './alumno-home.component.html',
  styleUrls: ['./alumno-home.component.scss']
})
export class AlumnoHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(type.globals);
    
  }

}
