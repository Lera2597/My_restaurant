import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MeseroComponent } from './mesero/mesero.component';
import { MesaComponent } from './mesa/mesa.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MeseroComponent,
    MesaComponent,
    HomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,// se requiere para uso de http
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
