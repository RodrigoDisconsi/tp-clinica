import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Horario } from 'src/app/models/horario';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.css']
})
export class HorariosProfesionalComponent implements OnInit {

  @Output() horarioGuardado = new EventEmitter<any>();
  @Input() usuario:User;
  seleccionoDia: boolean = false;
  diaSeleccionado:string;
  frmHorarios: FormGroup;
  horarios:Horario[] = [];

  constructor(private fb: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  onAgregar(){
    if(this.diaSeleccionado && this.validarDia(this.diaSeleccionado)){
      this.anadirCamposEsp(this.diaSeleccionado);
    }
  }

  onGuardar(){
    this.getHorarios.controls.forEach(x =>{
      this.horarios.push(x.value);
    });
    this.usuario.horarios = this.horarios;
    this.api.updateUser(this.usuario).then(x =>{
      this.horarioGuardado.emit(true);
    })
    .catch(e =>{
      console.log("Error ->", e);
    });
  }

  validarDia(dia:string):boolean{
    let retorno:boolean = true;
    this.getHorarios.controls.forEach(x =>{
      if(x.value.dia == dia){
        retorno = false;
      }
    });
    return retorno;
  }

  crearFormulario() {
    this.frmHorarios = this.fb.group({
      horarios: this.fb.array([])
    });
  }

  get getHorarios(): FormArray {
    return this.frmHorarios.get('horarios') as FormArray;
  }

  anadirCamposEsp(dia:string) {
      const nuevoCampo = this.fb.group({
        dia: new FormControl(dia),
        horaDesde: new FormControl('', Validators.required),
        horaHasta: new FormControl('', Validators.required)
      });
    
      this.getHorarios.push(nuevoCampo);
  }

  removerHorario(indice: number) {
    this.getHorarios.removeAt(indice);
  }


}
