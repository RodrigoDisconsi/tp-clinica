import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  public turnos:any;
  public checked:boolean = false;
  public primeraVez:boolean = false;
  public user:User;
  public paciente:boolean = false;
  public administrarHorario:boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    if(!this.user.horarios){
      this.administrarHorario = true;
    }
    this.paciente = this.user.tipo == 'paciente' ?? false;

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

  onHorarioGuardado(e){
    if(e){
      this.administrarHorario = false;
    }
    else{
      this.administrarHorario = true;
    }
  }
}
