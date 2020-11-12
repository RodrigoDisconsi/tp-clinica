import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-turnos-paciente',
  templateUrl: './ver-turnos-paciente.component.html',
  styleUrls: ['./ver-turnos-paciente.component.css']
})
export class VerTurnosPacienteComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    },
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'ver', title: '<i class="fa fa-eye"></i>'},
        { name: 'cancelar', title: '&nbsp;&nbsp&nbsp;&nbsp&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
        position: 'right'
    }
  };
  
  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onCustom(e){
    console.info(e);
  }
}
