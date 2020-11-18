import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrar-horarios',
  templateUrl: './administrar-horarios.component.html',
  styleUrls: ['./administrar-horarios.component.css']
})
export class AdministrarHorariosComponent implements OnInit {

  public lunes:boolean = false;
  public martes:boolean = false;
  public miercoles:boolean = false;
  public jueves:boolean = false;
  public viernes:boolean = false;
  public sabados:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onGuardar(){
    
  }

}
