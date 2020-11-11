import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent implements OnInit {
  
  public turnos:any;

  constructor() { }

  ngOnInit(): void {
    this.turnos = [{
      paciente: "Rodrigo Disconsi",
      dia: "Martes",
      horario: "08:00",
      mensaje: "Tengo mal estar estomacal, y una leve tos",
      especialidad: "Clinico",
      estado: false
    },
    {
      paciente: "Rodrigo Disconsi",
      dia: "Martes",
      horario: "08:00",
      mensaje: "Dolor en la muela de juicio",
      especialidad: "Odontología",
      estado: false
    }];
  }

}
