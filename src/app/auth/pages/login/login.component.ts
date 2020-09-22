import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/models/usuario';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: Usuario[];
  correo = '';
  password : string =  '';
  returnUrl: string;
  constructor(private usuarioService:UsuarioService,
    private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onSubmit(){
    var usuario = new Usuario();
    this.usuarioService.login(this.correo,this.password).pipe(first()).subscribe(
      authenticatedUser => {
        this.router.navigate([this.returnUrl]);
      },
      err => {
        this.snackBar.open( 'Usuario o contraseña incorrecta', '', { duration: 2000 });
      });
    
  }

  invitadoUser(){
    this.usuarioService.login('invitado','invitado').pipe(first()).subscribe(
      authenticatedUser => {
        this.router.navigate([this.returnUrl]);
      },
      err => {
        this.snackBar.open( 'Usuario o contraseña incorrecta', '', { duration: 2000 });
      });
  }
}
