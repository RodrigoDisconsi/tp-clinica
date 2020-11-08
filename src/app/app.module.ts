import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
// import { LandingComponent } from './landing/landing.component';
// import { ProfileComponent } from './profile/profile.component';
import { ProfileComponent } from './componentes/profile/profile.component';
// import { HomeComponent } from './home/home.component';
// import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
// import { FooterComponent } from './shared/footer/footer.component';
import { FooterComponent } from './componentes/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './componentes/login/login.component';
// import { HomeComponent } from './componentes/home/home.component';
import { RegisterComponent } from './componentes/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ProfesionalComponent } from './componentes/register/profesional/profesional.component';
import { AdministradorComponent } from './componentes/register/administrador/administrador.component';
import { PacienteComponent } from './componentes/register/paciente/paciente.component';
import { AltaProfesionalComponent } from './componentes/alta-profesional/alta-profesional.component';
import { AdministrarHorariosComponent } from './componentes/administrar-horarios/administrar-horarios.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { ConfirmarTurnosComponent } from './componentes/turnos/confirmar-turnos/confirmar-turnos.component';

@NgModule({
  declarations: [
    AppComponent,
    // LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    // HomeComponent,
    RegisterComponent,
    ProfesionalComponent,
    AdministradorComponent,
    PacienteComponent,
    AltaProfesionalComponent,
    AdministrarHorariosComponent,
    TurnosComponent,
    ConfirmarTurnosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
