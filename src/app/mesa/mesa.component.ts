import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServidorService } from '../services/servidor.service';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  private data: any;
  products: any = []
  bebidas: any = [];
  fuertes: any = [];
  entradas:any = [];
  pedido: any = [];
  totalPedido = 0;

  pedidovalor: any;
  waiter: any;
  table: any;
  id_mesa:any;
  option: number = 0;
  id_waiter: any;
  constructor(private route: ActivatedRoute, private servidor: ServidorService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.data = params;
      this.waiter = this.data.waiter;
      this.table = this.data.table;
      this.id_mesa = this.data.id_mesa;
      this.id_waiter = this.data.id_waiter;
      console.log("ide",this.id_mesa)
     });
    this.servidor.GetProduct("all").subscribe((answer:any) => {
      this.products = answer;
      //this.products = Object.values(this.products);
      Object.values(this.products).forEach(key => {
        let data: any = key;
        switch (data['tipo']) {
          case "fuerte":
            this.fuertes.push(data);
            break;
          case "bebida":
            this.bebidas.push(data);
            break;
          case "entrada":
            this.entradas.push(data);
            break;
        }
      });
    },()=>{alert("Error: No se encontro lo datos")});
    /******* */
    this.servidor.GetPedido("only",this.table).subscribe((x:any) =>{
      if(x==null){
        this.pedidovalor = 0;
      }
      else{
        this.pedidovalor = x["valor"];
      }
      console.log(x)
      
    },()=>{
      alert("error")
    })


  }
  ClaseComida(tipo: any) {
    switch (tipo) {
      case 'entrada':
        this.option = 0;
        //console.log(this.products.filter)
        //Agregar la seleccion de la opcion en html
        //console.log(tipo);
        break;
      case 'fuerte':
        this.option = 1;
        //Agregar la seleccion de la opcion en html

        //console.log(tipo);
        break;
      case 'bebida':
        this.option = 2;
        //Agregar la seleccion de la opcion en html 
        //console.log(tipo);
        break;
    }
  }

  AddProduct(product: any) {
    console.log('Add product: ', product);
    this.pedido.push(
      {name:product.nombre,
        cant: 1, 
        comentary:'', 
        value: product.valor, 
        price: product.valor,
        productId: product.id,
        productName: product.nombre
      });
    this.updateTotal();


  }
  ToInt(valor:any){
    return parseInt(valor,10);
  }

  deleteItem(id: any){
    this.pedido.splice(id, 1);
    this.updateTotal();

  }
  updateItem(i:number){
    this.pedido[i].value = Number(this.pedido[i].price) * Number(this.pedido[i].cant); 
    this.updateTotal();

  }

  updateTotal(){
    this.totalPedido = 0;
    this.pedido.forEach((element:any) => {
      this.totalPedido += Number(element.value);  
    });

  }
  createPedido(){
    let data = {
      table: 'pedido',
      id_usuario:Number(this.id_waiter),
      nombre_mesa:this.table,
      estado: 1,
      valor: this.totalPedido
    }
    console.log('informació del pedido', this.pedido)
    this.servidor.createPedido(data).subscribe((x: any) => {
      if(x.answer === 'ok'|| x){
        this.servidor.GetPedido('only',data.nombre_mesa).subscribe( (x1:any) => {
          let idPedido = Number(x1.id);
          alert('pedido enviado');
          this.pedido = [];
          this.totalPedido = 0;
         this.pedido.forEach((item:any )=> {
            this.servidor.createItem({
              table: 'item',
              id_producto: item.productName,
              id_pedido: idPedido,
              estado: 1,
              cantidad: Number(item.cant),
              comentario: item.comentary,
              nombre_producto: item.productName
            }).subscribe(
              X => {

                console.log('item guardado: ', X)
              }
            )

          })

        }
        )

      }
 
    })
  }



}
