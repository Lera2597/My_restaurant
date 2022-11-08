import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServidorService } from '../services/servidor.service';

@Component({
  selector: 'app-mesero',
  templateUrl: './mesero.component.html',
  styleUrls: ['./mesero.component.css']
})
export class MeseroComponent implements OnInit {
  mesas: any=[];
  waiter:any;
  pedidos: any=[];
  preciosmesa: any=[];
  pedido:any = [{"valor":0}];
  nombre:string= "";
  constructor(
    private ruta:ActivatedRoute,
    private servidor:ServidorService
  ) { }
  ngOnInit(): void {
    this.waiter= this.ruta.snapshot.paramMap.get('user');
    console.log("mesero "+ this.waiter);
    //*********** */

    this.servidor.GetPedido("all").subscribe(data=>{
      this.pedidos = data;
      console.log("get pedidos",data)
      
    },()=>{alert("Error: no se encontro los datos")});
    /*********** */

    this.servidor.GetMesa("all").subscribe(data=>{
      this.mesas = data;
      console.log("get mesas",data)
      /*
      let objeto = {};
      Object.values(data).forEach((mesa:any) => {
        let y:any = [];
        y = this.pedidos.filter((x:any) => {return x["id_mesa"]===mesa["id"];});
        if(y.length){
          this.nombre = mesa["nombre"];
          console.log(this.nombre)
          objeto = {k:y[0]["valor"]};
          
        }
        else{
          this.nombre = mesa["nombre"];
          objeto = {nombre3:0};
        }
        this.preciosmesa.push(objeto);
      });
      console.log(this.preciosmesa);
      console.log("GetMesa")
      */
    },()=>{alert("Error: no se encontro los datos")});
    

  }
  DisponibilidadMesa(nombre_mesa:any){
    this.pedido= this.pedidos.filter((x:any) => {return x.nombre_mesa===nombre_mesa;});
    if(!this.pedido.length){
      return 1;
    }
    else{
      return 0;
    }
  }

}
