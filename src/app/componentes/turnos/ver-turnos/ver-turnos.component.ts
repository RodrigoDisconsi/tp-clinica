import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AtenderTurnoComponent } from '../atender-turno/atender-turno.component';

@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent implements OnInit {
  
  public turnos:any;

  constructor(public dialog: MatDialog) { }

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

  atender(){
    let dialogRef = this.dialog.open(AtenderTurnoComponent,
      {
        width: '50%',
        height: '80%'
      });
  }

}
