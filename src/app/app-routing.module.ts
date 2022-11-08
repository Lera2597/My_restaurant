import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './chef/chef.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MesaComponent } from './mesa/mesa.component';
import { MeseroComponent } from './mesero/mesero.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'mesa',component:MesaComponent},
  {path:'home',component:HomeComponent},
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'mesero/:user',component:MeseroComponent},
  {path:'chef/:user',component:ChefComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
