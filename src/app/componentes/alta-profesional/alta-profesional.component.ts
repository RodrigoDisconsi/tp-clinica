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

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getWithFilter("Users", "tipo", "==", "profesional").subscribe(x =>{
      this.usuarios = x;
    });
  }

}
