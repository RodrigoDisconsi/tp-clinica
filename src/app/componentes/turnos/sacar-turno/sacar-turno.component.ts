import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  public profesionales:any;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getWithFilter("Users", "tipo", "==", "profesional").subscribe(resp =>{
      resp.map(x =>{
        console.info(x);
      })
      this.profesionales = resp;
      console.info(this.profesionales);
    });
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && day !== 1;
  }

}
