import { Component, OnInit } from '@angular/core';
import{AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from '../services/servidor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formularioRegistro = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  private respuesta:any={answer:0};
  constructor(private servidor:ServidorService, private reuter:Router) { }

  ngOnInit(): void {
  }
  login(){
    console.log(this.formularioRegistro.value);
    this.servidor.login(this.formularioRegistro.value).subscribe(answer=>{this.respuesta=answer});
    
    console.log(this.respuesta);
    if(this.respuesta.answer){
      console.log("bien");

      this.reuter.navigate(['/mesero',this.respuesta.name])
    }
    else{
      console.log("mal");
    }
    console.log(this.respuesta.answer);
  }
  ValidateUser(servicio:ServidorService){
    return (control:AbstractControl)=>{
      const value = control.value;
      return servicio.login(value);
    }
  }
}

