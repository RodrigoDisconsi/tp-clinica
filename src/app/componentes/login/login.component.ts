import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  focus;
  focus1;
  cargando: boolean = false;
  hide:boolean = false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin(){
    this.cargando = true;
    this.loginForm.disable();
    try{
      const user = await this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
      if(user){
        this.loginForm.enable();
        this.cargando = false;
        this.router.navigateByUrl("");
      }
    }
    catch(e){
      console.log("ERROR ->", e);
    }
  }

  getErrorMessage(field:string): string{
    let retorno;
    if(this.loginForm.get(field).errors.required){
        retorno = "Campo vacío."
    }
    else if (this.loginForm.get(field).hasError("minLength")){
      retorno = "Error. Mínimo de carácteres 6";
    }
    return retorno;
  }

  isNotValidField(field:string): boolean{
    return (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) 
    && !this.loginForm.get(field).valid;
  }

}
