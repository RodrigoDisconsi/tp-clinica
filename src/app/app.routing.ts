import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { HomeComponent } from './componentes/home/home.component';
// import { ProfileComponent } from './profile/profile.component';
import { ProfileComponent } from './componentes/profile/profile.component';
// import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LandingComponent } from './landing/landing.component';
// import { LoginComponent } from './login/login.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'profile',     component: ProfileComponent },
    { path: 'register',           component: RegisterComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'login',          component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
