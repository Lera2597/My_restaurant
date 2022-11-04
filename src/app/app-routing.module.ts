import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MesaComponent } from './mesa/mesa.component';
import { MeseroComponent } from './mesero/mesero.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'mesa',component:MesaComponent},
  {path:'mesero/:user',component:MeseroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
