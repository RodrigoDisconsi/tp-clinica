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
      horario: "8:00",
      mensaje: "Tengo mal estar estomacal, y una leve tos",
      estado: false
    },
    {
      paciente: "Rodrigo Disconsi",
      dia: "Martes",
      horario: "8:00",
      mensaje: "Dolor en la muela de juicio",
      estado: false
    },
    {
      paciente: "Rodrigo Disconsi",
      dia: "Martes",
      horario: "8:00",
      estado: false
    }];
  }

  onChange(turno){
    // console.info(e);
    this.primeraVez = true;
    console.info(turno);
  }

}
