import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/usuario/models/usuario';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarios: Usuario[];
  correo = '';
  password : string =  '';
  constructor(private usuarioService:UsuarioService,
    private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(usuarios => {
      this.usuarios = usuarios;
    })
  }


  onSubmit(){
    var usuario = new Usuario();
    usuario =  this.usuarios.filter(usuario => usuario.correo == this.correo)[0];
    if (usuario){
      if (usuario.password == this.password){
        this.router.navigate(['/']);
      } else {
        this.snackBar.open('Correo o contraseña incorrecta', '', { duration: 2000 });
      }
    }else {
      this.snackBar.open('Correo o contraseña incorrecta', '', { duration: 2000 });
    }

  }
}
