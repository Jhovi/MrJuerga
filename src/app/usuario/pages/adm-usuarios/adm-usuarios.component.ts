import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.component.html',
  styleUrls: ['./adm-usuarios.component.css']
})
export class AdmUsuariosComponent implements OnInit {

  fechaActual = new Date();
  anioActual: number = this.fechaActual.getFullYear();
  usuarios: Usuario[];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo','telefono', 'edad', 'dni', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  constructor(private usuarioService:UsuarioService,private router: Router, 
    private route: ActivatedRoute, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this.usuarioService.findAll().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.usuarios.forEach(usuario => {
        usuario.edad = this.anioActual - (+usuario.fechaNacimiento.slice(0,4))
      })
      this.usuarios = this.usuarios.filter(usuarios => usuarios.estado == 'Activo');
      this.dataSource = new MatTableDataSource(this.usuarios);
    })
  }

  onSelect(usuario:Usuario){
    if (usuario.id) {
      let link = '../'
      this.router.navigate([link + usuario.id ], { relativeTo: this.route });
    }
  }

  eliminar(usuario:Usuario){
    console.log(usuario);
    this.usuarioService.delete(usuario).subscribe( () => {
      this._snackBar.open('Eliminacion con éxito', '', { duration: 2000 });
      this.getUsuarios();
    },
      err => {
        this._snackBar.open(err, '', { duration: 2000 });
    })
  }

  saveUsuarioView(){
    let link = '../'
    this.router.navigate([link + "/save" ], { relativeTo: this.route });
  }
}
