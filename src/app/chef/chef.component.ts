import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServidorService } from '../services/servidor.service';
@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
  chef:any;
  pedidos:any=[];
  items:any = [];
  constructor(
    private ruta:ActivatedRoute,
    private servidor:ServidorService
  ) { }

  ngOnInit(): void {
    this.chef= this.ruta.snapshot.paramMap.get('user');
    console.log("mesero "+ this.chef);

    this.servidor.GetItem("all").subscribe((data:any)=>{
      this.items = data;
      console.log(this.items)
    },()=>{
      alert("Error:erro en la base da datos")
    });
    /***** */
    this.servidor.GetPedido("all").subscribe((data:any)=>{
      this.pedidos = data;
      console.log(this.pedidos)
    },()=>{
      alert("Error: proeblema con la base de datos")
    });

  }
  busquedaitem(id_pedido:any){
    //this.pedidos.filter((x:any) => {return x["id_mesa"]===id_mesa;});
    return this.items.filter((x:any)=>{return x.id_pedido === id_pedido})
  }
  UpdateState(pedido:any){
    
    this.servidor.UpdateItem("several",{id_pedido:pedido.id,estado:0}).subscribe(
      (x:any)=>{
        if(x.answer!="ok"){
          alert("La base de datos ya estaba actualizada");
          
        }
      },
      ()=>{alert("Errooooo")}
    );
    pedido.estado=0;
    console.log(pedido)
    this.servidor.UpdatePedido("only",pedido).subscribe((x:any)=>{
      if(x.answer=="ok"){
        alert(" Pedido despachado");  
      }   
    },()=>{alert("Errooooo")});
  }
  ChangeState(data:any){
    data.estado = !data.estado;
    //console.log("item:",data)
    //console.log(this.items)
  }
  ToInt(valor:any){
    return parseInt(valor,10);
  }
  validarPedido(id_pedido:any){
    let ischecked = true;
    let items:any = this.busquedaitem(id_pedido);
    items.forEach((item:any) => {
      ischecked = ischecked && !item.estado
    });
    //console.log("check mesa:",id_pedido,ischecked)
    return !ischecked;
  }

}
