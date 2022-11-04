import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MesaComponent } from './mesa/mesa.component';
import { MeseroComponent } from './mesero/mesero.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'mesa',component:MesaComponent},
  {path:'home',component:HomeComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'mesero/:user',component:MeseroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
