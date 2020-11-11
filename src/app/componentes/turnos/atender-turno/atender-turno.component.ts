import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef,  MatDialogClose, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';


@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.css']
})
export class AtenderTurnoComponent implements OnInit {

  @Input() mensaje;
  form: FormGroup;
  otroCampo: boolean;
  agregarCampoGen: boolean = true;
  
  constructor(public dialogRef: MatDialogRef<AtenderTurnoComponent>, private fb: FormBuilder) { 

  }

  ngOnInit() {
    this.crearFormulario();
    this.anadirCamposGen();
  }

  onChange(){
    if(this.otroCampo){
      this.form.controls['nuevoCampo'].enable();
    }
    else{
      this.form.controls['nuevoCampo'].setValue("");
      this.form.controls['nuevoCampo'].disable();
    }
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      camposGen: this.fb.array([]),
      nuevoCampo: ['']
    });
  }

  get camposGen(): FormArray {
    return this.form.get('camposGen') as FormArray;
  }

  anadirCamposGen() {
    const nuevoCampo = this.fb.group({
      nombre: new FormControl('Temperatura'),
      desc: new FormControl('')
    });
  
    this.camposGen.push(nuevoCampo);
  }

  anadirCampoGen(){
    const nuevoCampo = this.fb.group({
      nombre: new FormControl(this.form.controls['nuevoCampo'].value),
      desc: new FormControl('')
    });

    this.agregarCampoGen = false;
    this.otroCampo = false;
    this.camposGen.push(nuevoCampo);
  }

  borrarTrabajo(indice: number) {
    this.camposGen.removeAt(indice);
  }


}
