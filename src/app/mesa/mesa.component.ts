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
  public arrayproduct = [];
  pro: any = [{ "casa": 1, "dodo": 2 }, { "casas": 52, "coro": 77 }];
  products: any = []
  bebidas: any = [];
  fuertes: any = [];
  entradas:any = [];

  user: any;
  table: any;
  option: number = 0;
  constructor(private route: ActivatedRoute, private servidor: ServidorService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.data = params });
    this.user = this.data.name;
    this.table = this.data.mesa;
    this.servidor.GetProduct("all").subscribe(answer => {
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
        console.log(data["disponibilidad"])
      });
      //console.log( Object.keys(this.bebidas).length);
      // Object.values(this.bebidas).forEach(key => {
      //   let data: any = key;
      //   console.log(data["nombre"])
      // });
    });


  }
  ClaseComida(tipo: any) {
    switch (tipo) {
      case 'entrada':
        this.option = 0;
        //console.log(this.products.filter)
        //Agregar la seleccion de la opcion en html
        //Traer los productos de la base de datos 
        //console.log(tipo);
        break;
      case 'fuerte':
        this.option = 1;
        //Agregar la seleccion de la opcion en html
        //Traer los productos de la base de datos 
        //console.log(tipo);
        break;
      case 'bebida':
        this.option = 2;
        //Agregar la seleccion de la opcion en html
        //Traer los productos de la base de datos 
        //console.log(tipo);
        break;
    }
  }
  ToInt(valor:any){
    return parseInt(valor,10);
  }
  AddProduct(product:any){

    let disponibilidad = this.ToInt(product["disponibilidad"]);
    if(disponibilidad){

    }
    else{
      alert("Producto no estadisponible");
    }
    
  }


}
