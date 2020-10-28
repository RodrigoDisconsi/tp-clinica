import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  focus;
  focus1;
  focus2;
  cargando:boolean = false;
  registroForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
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
        const user = await this.auth.register(userReg.email, userReg.password, userReg.username, "paciente");
        if(user){
          this.router.navigateByUrl("/login");
          this.cargando = false;
        }
      }
      catch(e){
        console.info('ERROR -> ', e);
        this.cargando = false;
      }
  }
  
}
