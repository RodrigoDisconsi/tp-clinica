import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
// import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.component.html',
  styleUrls: ['./registro-profesional.component.css']
})
export class RegistroProfesionalComponent implements OnInit {
  otraEspecialidad:boolean = false;
  cargando:boolean = false;
  especialidades:any;
  registroForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    especialidad: [''],
    otraEspecialidad: ['']
  });


  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    // let obj = {
    //   id: Guid.create().toString(),
    //   especialidades: this.especialidades
    // }
    // this.api.setObj("especialidades", obj).then(x =>{
    //   console.log(x);
    // });
    this.api.getAll("especialidades").subscribe(x => {
      this.especialidades = x[0];
    });
  }


  getErrorMessage(field:string): string{
    let retorno;
    if(this.registroForm.get(field).errors.required){
        retorno = "Campo vacío."
    }
    else if (this.registroForm.get(field).hasError("minLength")){
      retorno = "Error. Mínimo de carácteres 6";
    }
    return retorno;
  }

  isNotValidField(field:string): boolean{
    return (this.registroForm.get(field).touched || this.registroForm.get(field).dirty) 
    && !this.registroForm.get(field).valid;
  }

  async onRegister(){
      this.cargando = true;
      try{
        let userReg = this.registroForm.value;
        const user = await this.auth.register(userReg.email, userReg.password, userReg.username, "profesional");
        if(user){
          this.router.navigateByUrl("");
          this.cargando = false;
        }
      }
      catch(e){
        console.info('ERROR -> ', e);
        this.cargando = false;
      }
  }

  onChange(){
    if(this.otraEspecialidad){
      this.registroForm.controls['otraEspecialidad'].enable();
    }
    else{
      this.registroForm.controls['otraEspecialidad'].disable();
    }
  }

  parseFormToUser(){

  }
}
