import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  cargando:boolean = false;
  tipoUsuario:string;
  registroForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) {
    
   }

  ngOnInit(): void {
    const user = this.auth.getUser();
    if(user){
      if(user.tipo != "admin"){
        this.router.navigateByUrl("");
      }
    }
    else{
      this.router.navigateByUrl("");
    }
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
      try{
        const userReg:User = this.registroForm.value;
        userReg.tipo = "admin";
        const user = await this.auth.register(userReg);
        if(user){
          this.router.navigateByUrl("/login");
        }
      }
      catch(e){
        console.info('ERROR -> ', e);

      }
      finally{
        this.cargando = false;
        this.registroForm.enable();
      }
  }

}
