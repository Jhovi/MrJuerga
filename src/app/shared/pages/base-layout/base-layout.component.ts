import { Component, OnInit } from '@angular/core';
import { Module, OpcionService } from '../../services/opcion.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  modules: Module[] = [
    
  ]
  constructor(private opcionService: OpcionService,) { }

  ngOnInit(): void {
    
    this.modules = this.opcionService.getOpciones();
  }

}
