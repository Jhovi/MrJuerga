import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Module, OpcionService } from '../../services/opcion.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  modules: Module[] = [

  ]
  constructor(private opcionService: OpcionService, private authService:UsuarioService,
    private router: Router,) { }

  ngOnInit(): void {

    this.modules = this.opcionService.getOpciones();
  }

  openChangePassword() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
