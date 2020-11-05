import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-alta-profesional',
  templateUrl: './alta-profesional.component.html',
  styleUrls: ['./alta-profesional.component.css']
})
export class AltaProfesionalComponent implements OnInit {

  public usuarios:Array<User>;
  public cargando:boolean = false;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.api.getWithFilter("Users", "tipo", "==", "profesional").subscribe(x =>{
      this.usuarios = x;
      this.cargando = false;
    });
  }

  onClickBtn(){
    // this.api.setAllObj("Users", this.usuarios).then(x =>{
    //   console.info(x);
    // });
    this.cargando = true;
    this.usuarios.forEach(user => {
      this.api.updateUser(user).then(x =>{
        this.cargando = false;
      })
      .catch(e =>{
        console.info("Error", e);
      });
    });
  }

}
