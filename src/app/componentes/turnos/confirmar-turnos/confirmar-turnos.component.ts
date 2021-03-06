import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmar-turnos',
  templateUrl: './confirmar-turnos.component.html',
  styleUrls: ['./confirmar-turnos.component.css']
})
export class ConfirmarTurnosComponent implements OnInit {

  public turnos:any;
  public checked:boolean = false;
  public primeraVez:boolean = false;

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

  onChange(turno){
    this.primeraVez = true;
    console.info(turno);
  }

}
