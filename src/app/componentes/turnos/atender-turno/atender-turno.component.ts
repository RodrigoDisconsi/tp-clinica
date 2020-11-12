import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef,  MatDialogClose, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.css']
})
export class AtenderTurnoComponent implements OnInit {

  @Input() mensaje;
  form: FormGroup;
  otroCampo: boolean;
  otroCampoEsp: boolean;
  agregoCamposEsp: boolean = false;
  agregarCampoGen: boolean = true;
  limiteDeCampos: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<AtenderTurnoComponent>, private fb: FormBuilder) { 

  }

  ngOnInit() {
    this.crearFormulario();
    this.anadirCamposGen('Temperatura');
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

  onChangeEsp(){
    if(this.otroCampoEsp){
      this.form.controls['nuevoCampoEsp'].enable();
    }
    else{
      this.form.controls['nuevoCampoEsp'].setValue("");
      this.form.controls['nuevoCampoEsp'].disable();
    }
  }
  
  crearFormulario() {
    this.form = this.fb.group({
      camposGen: this.fb.array([]),
      camposEsp: this.fb.array([]),
      nuevoCampo: [''],
      nuevoCampoEsp: ['']
    });
  }

  get camposGen(): FormArray {
    return this.form.get('camposGen') as FormArray;
  }

  get camposEsp(): FormArray {
    return this.form.get('camposEsp') as FormArray;
  }

  anadirCamposEsp() {
      const nuevoCampo = this.fb.group({
        nombre: new FormControl(this.form.controls['nuevoCampoEsp'].value),
        desc: new FormControl('')
      });
    
      this.camposEsp.push(nuevoCampo);
      this.agregoCamposEsp = true;
      if(this.form.controls['camposEsp'].value.length == 3 )
         this.limiteDeCampos = true;
  }

  borrarCamposEsp(indice: number) {
    this.camposEsp.removeAt(indice);
  }


  anadirCamposGen(nombreCampo:string) {
    const nuevoCampo = this.fb.group({
      nombre: new FormControl(nombreCampo),
      desc: new FormControl('', Validators.required)
    });
  
    this.camposGen.push(nuevoCampo);
  }

  anadirCampoGen(){
    this.agregarCampoGen = false;
    this.otroCampo = false;
    this.anadirCamposGen(this.form.controls['nuevoCampo'].value);
  }

  borrarTrabajo(indice: number) {
    this.camposGen.removeAt(indice);
  }


}
