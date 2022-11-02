import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  private data: any;
  user: any;
  table: any;
  option:number=0;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.data = params });
    this.user = this.data.name;
    this.table = this.data.mesa;
  }
  ClaseComida(tipo: any) {
    switch (tipo) {
      case 'entrada':
        this.option= 0;
        //Agregar la seleccion de la opcion en html
        //Traer los productos de la base de datos 
        //console.log(tipo);
        break;
      case 'fuerte':
        this.option= 1;
        //Agregar la seleccion de la opcion en html
        //Traer los productos de la base de datos 
        //console.log(tipo);
        break;
      case 'bebida':
        this.option= 2;
        //Agregar la seleccion de la opcion en html
        //Traer los productos de la base de datos 
        //console.log(tipo);
        break;
    }
  }


}
