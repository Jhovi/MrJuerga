import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/auth/dialog/change-password/change-password.component';
import { Usuario } from 'src/app/usuario/models/usuario';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { environment } from 'src/environments/environment';
import { Module, OpcionService } from '../../services/opcion.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  modules: Module[] = [

  ]
  routerLink = '/productos/category/';
  usuario: Usuario = new Usuario();
  constructor(private opcionService: OpcionService, private authService: UsuarioService,
    private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog,) { }

  ngOnInit(): void {

    let userId = this.authService.authenticatedUserValue.id
    this.authService.findById(userId).subscribe(usuario => {
      this.usuario = usuario
    })
    this.modules = this.opcionService.getOpciones();
  }

  openChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  redirectCategory(categoria: string) {


    this.router.navigate([this.routerLink, categoria]);

  }

  opcionPerfil() {
    let link = '../../../../usuarios/'
    this.router.navigate([link + this.usuario.id]);
  }

}
