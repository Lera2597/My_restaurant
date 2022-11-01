import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  private link_login = 'http://localhost:80/Web_Proyecto_Final/Prueba1/Login.php';
  //respuesta:any={hola:10};
  constructor(private http:HttpClient) { 
  }
  login(data:any){
    console.log(data);
    const path = `${this.link_login}`;
    console.log(path);
    return this.http.post(path,data);
  }
}