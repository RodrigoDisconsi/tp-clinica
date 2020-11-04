import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { ApiService } from 'src/app/servicios/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { asEnumerable } from 'linq-es2015';
// import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.css']
})
export class ProfesionalComponent implements OnInit {
  otraEspecialidad:boolean = false;
  cargando:boolean = false;
  especialidades:any = [];
  userEspecialidad:string[] = [];
  registroForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    especialidad: [''],
    otraEspecialidad: ['']
  });
  groups:any;


  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router, private api:ApiService) { }

  ngOnInit(): void {
    this.api.getAll("especialidades").subscribe(x => {
      this.especialidades = x[0];
    });
  }

  onClickCheckbox(especialidad:string){
    const index = this.userEspecialidad.indexOf(especialidad, 0);
    if (index > -1) {
      this.userEspecialidad.splice(index, 1);
    }
    else{
      this.userEspecialidad.push(especialidad);
    }
    console.info(this.userEspecialidad);
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
      this.registroForm.disable();
      let otraEspecialidad = this.registroForm.value.otraEspecialidad;
      try{
        const userReg:User = this.registroForm.value;
        userReg.tipo = "Profesional";
        if(this.otraEspecialidad){
          if(otraEspecialidad){
            this.userEspecialidad.push(otraEspecialidad);
            this.agregarEspecialidad(otraEspecialidad);
          }
        }
        userReg.especialidad = this.userEspecialidad;
        const user = await this.auth.register(userReg);
        if(user){
          this.router.navigateByUrl("");
        }
      }
      catch(e){
        console.info('ERROR -> ', e);
      }
      finally{
        this.cargando = false;
        this.registroForm.enable(); 
        this.userEspecialidad = [];
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

  agregarEspecialidad(especialidad:string){
    this.especialidades.especialidades.push(especialidad);
    this.api.setObj("especialidades", this.especialidades);
  }
}
