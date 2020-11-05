import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/servicios/api.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user:User;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

}
