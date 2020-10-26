import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  test : Date = new Date();
  focus;
  focus1;
  focus2;
  registroForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  constructor(private fb: FormBuilder) { }

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
  
}
