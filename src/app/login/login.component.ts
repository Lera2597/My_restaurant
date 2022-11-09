import { Component, OnInit } from '@angular/core';
import{FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from '../services/servidor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../register/register.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm ;

  private user:any={answer:0};
  constructor(
    private servidor:ServidorService, 
    private router:Router, 
    private formBuilder: FormBuilder
    ) 
    {
      this.LoginForm = this.formBuilder.group(
        {
          username: ['',Validators.required],
          password: ['',Validators.required]
        }
      )
     }

  ngOnInit(): void {
  }
  login(){
    console.log(this.LoginForm.value);
    this.servidor.login(this.LoginForm.value).subscribe(x=>
      {
        this.user=x;
        if(this.user.answer){
          if(this.user.rol==1){//Chef=1
            this.router.navigate(['/chef'], { queryParams : this.user })
          }
          else{
            console.log('info del user: ', this.user)
            this.router.navigate(['/mesero'], { queryParams : this.user }
            )
          }
          
        }
        else{
          alert("Usuaro no esta registrado")
        }
      },()=>{alert("Se produjo un error")}
      );
  }
  register(){
    this.router.navigate(['/register']);
  }
}

