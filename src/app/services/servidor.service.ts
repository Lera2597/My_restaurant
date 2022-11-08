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

  GetProduct(cantidad:string,name?:any){
    let path = `${this.rootPath}Get.php`;
    let data:any;
    switch (cantidad){
      case "only":
        data = {table:"producto",query:"only",name:name};
        break
      case "all":
        data = {table:"producto",query:"all"};
        break
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
  GetMesa(cantidad:any,name?:any){
    let path = `${this.rootPath}Get.php`;
    let data:any;
    switch (cantidad){
      case "only":
        data = {table:"mesa",query:"only",name:name};
        break
      case "all":
        data = {table:"mesa",query:"all"};
        break
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
  GetPedido(cantidad:any,nombre_mesa?:any){
    let path = `${this.rootPath}Get.php`;
    let data:any;
    switch (cantidad){
      case "only":
        data = {table:"pedido",query:"only",nombre_mesa:nombre_mesa};
        break
      case "all":
        data = {table:"pedido",query:"all"};
        break
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
  GetItem(cantidad:any,id_pedido?:any){
    let path = `${this.rootPath}Get.php`;
    let data:any;
    switch (cantidad){
      case "only":
        data = {table:"item",query:"only",id_pedido:id_pedido};
        break
      case "all":
        data = {table:"item",query:"all"};
        break
      case "part":
        data = {table:"item",query:"part",id_pedido:id_pedido};
        break;
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
  UpdateItem(cantidad:any,data?:any,){
    let path = `${this.rootPath}Update.php`;
    switch(cantidad){
      case "several":
        data["table"]="item"
        data["query"]="several"
        break;
      case "only":
        data["table"]="item"
        data["query"]="only"
        break;
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
  UpdatePedido(cantidad:any,data?:any,){
    let path = `${this.rootPath}Update.php`;
    switch(cantidad){
      case "several":
        data["table"]="item"
        data["query"]="several"
        break;
      case "only":
        data["table"]="pedido"
        data["query"]="only"
        break;
    }
    console.log(path,data);
    return this.http.post(path,data);
  }
  

  createPedido(){
    let data = {
      table: 'pedido',
      id_usuario:1,
      id_mesa:2,
      estado: 1,
      valor:20000
    }
    return this.http.post(`${this.rootPath}Set.php`, data )


  }
}
