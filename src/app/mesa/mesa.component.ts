import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {
  mesa_id:any;
  constructor(private ruta:ActivatedRoute) { }
  ngOnInit(): void {
    this.mesa_id = this.ruta.snapshot.paramMap.get('id_mesa');
  }

}
