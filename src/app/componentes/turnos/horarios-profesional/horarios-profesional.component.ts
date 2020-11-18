import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.css']
})
export class HorariosProfesionalComponent implements OnInit {
  seleccionoDia: boolean = false;
  diaSeleccionado:string;
  frmHorarios: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.crearFormulario();
    // this.anadirCamposEsp();
  }

  onAgregar(){
    if(this.diaSeleccionado && this.validarDia(this.diaSeleccionado)){
      this.anadirCamposEsp(this.diaSeleccionado);
    }
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
        hora: new FormControl('')
      });
    
      this.getHorarios.push(nuevoCampo);
      // this.agregoCamposEsp = true;
      // if(this.form.controls['camposEsp'].value.length == 3 )
      //    this.limiteDeCampos = true;
  }

  removerHorario(indice: number) {
    this.getHorarios.removeAt(indice);
  }


}
