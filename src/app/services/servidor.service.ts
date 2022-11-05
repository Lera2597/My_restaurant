import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  private rootPath = 'http://localhost:80/Web_Proyecto_Final/';
  //respuesta:any={hola:10};
  constructor(private http:HttpClient) { 
  }
  login(data:any){
    console.log(data);
    const path = `${this.rootPath}/login.php`;
    console.log(path);
    return this.http.post(path,data);
  }

  register(data: any){
    return this.http.post(`${this.rootPath}Set.php`, data )
  }

  GetProduct(cantidad:string){
    let path = `${this.rootPath}Get.php`;
    let data:any;
    switch (cantidad){
      case "only":
        data = {table:"producto",query:"only",name:"cocacola"};
        break
      case "all":
        data = {table:"producto",query:"all"};
        break
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
}
