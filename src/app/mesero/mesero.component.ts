import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mesero',
  templateUrl: './mesero.component.html',
  styleUrls: ['./mesero.component.css']
})
export class MeseroComponent implements OnInit {

  name:any;
  constructor(private ruta:ActivatedRoute) { }
  ngOnInit(): void {
    this.name= this.ruta.snapshot.paramMap.get('user');
    console.log("mesero "+ this.name);
  }

}
