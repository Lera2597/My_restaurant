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

  private respuesta:any={answer:0};
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
    this.servidor.login(this.LoginForm.value).subscribe(answer=>
      {
        this.respuesta=answer;
        if(this.respuesta.answer){
          this.router.navigate(['/mesero',this.respuesta.name])
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

