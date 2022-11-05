import { Component, OnInit } from '@angular/core';
import{AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from '../services/servidor.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: ServidorService,
  ) {
    this.registerForm = this.formBuilder.group(
      { name: ['',Validators.required],
        pass: ['', Validators.required],
        username: ['', Validators.required],
        rol: [1],
        table:["usuario"]
    }
    )
   }

  ngOnInit(): void {
  }

  createUser(){
    console.log('NewUser: ', this.registerForm.value);
    this.registerService.register(this.registerForm.value).subscribe( x => {
      let data:any= x;
      if(data["answer"]=="ok"){
        alert('Usuario creado');
      }
      else{
        alert('Usuario ya existe');
      }
    })
  }

}
