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

  fileToUpload: File = null;
  mostrarProgreso: boolean = false;
  fechaActual = new Date();
  anioActual: number = this.fechaActual.getFullYear();
  usuarios: Usuario[];
  displayedColumns: string[] = ['id', 'nombre', 'correo', 'telefono', 'edad', 'dni', 'acciones'];
  dataSource: MatTableDataSource<Usuario>;
  constructor(private usuarioService: UsuarioService, private router: Router,
    private route: ActivatedRoute, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.findAll().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.usuarios.forEach(usuario => {
        usuario.edad = this.anioActual - (+usuario.fechaNacimiento.slice(0, 4))
      })
      this.usuarios = this.usuarios.filter(usuarios => usuarios.estado == 'activo' && usuarios.correo != 'admin' && usuarios.correo != 'invitado');
      this.dataSource = new MatTableDataSource(this.usuarios);
    })
  }

  onSelect(usuario: Usuario) {
    if (usuario.id) {
      let link = '../'
      this.router.navigate([link + usuario.id], { relativeTo: this.route });
    }
  }

  eliminar(usuario: Usuario) {
    this.usuarioService.delete(usuario).subscribe(() => {
      this._snackBar.open('Eliminacion con éxito', '', { duration: 2000 });
      this.getUsuarios();
    },
      err => {
        this._snackBar.open(err, '', { duration: 2000 });
      })
  }

  saveUsuarioView() {
    let link = '../'
    this.router.navigate([link + "/save"], { relativeTo: this.route });
  }

  generateExcel() {
    this.mostrarProgreso = true;
    this.usuarioService.generateExcel().subscribe((response) => {
      if (response) {
        this.mostrarProgreso = false;
        const file = new Blob([response], { type: 'application/vnd.ms-excel' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      }
    }, err => {
      this._snackBar.open(err, '', { duration: 2000 });
    })
  }

  generatePDF() {
    this.mostrarProgreso = true;
    this.usuarioService.generatePDF().subscribe((response) => {
      if (response) {
        this.mostrarProgreso = false;
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        var link = document.createElement('a');
        link.href = fileURL;
        link.download = "usuarios.pdf";
        link.click();
      }
    }, err => {
      this._snackBar.open(err, '', { duration: 2000 });
    })
  }


  public onArchivoSelected(event: any) {
    this.mostrarProgreso = true;
    let file = event.target.files[0] as File;
    this.usuarioService.saveFile(file).subscribe(() => {
      this.usuarioService.importCsv(file.name).subscribe( () => {
        this.mostrarProgreso = false;
        this._snackBar.open('Usuarios registrados con éxito', '', { duration: 2000 });
        this.getUsuarios();
      }, err => {
        this.mostrarProgreso = false;
        this._snackBar.open('Problemas al leer el archivo', '', { duration: 2000 });

      })
    })
  }

  public onExcelSelected(event:any){
    this.mostrarProgreso = true;
    let file = event.target.files[0] as File;
    this.usuarioService.saveFile(file).subscribe(() => {
      this.usuarioService.importExcel(file.name).subscribe( () => {
        this.mostrarProgreso = false;
        this._snackBar.open('Usuarios registrados con éxito', '', { duration: 2000 });
        this.getUsuarios();
      }, err => {
        this.mostrarProgreso = false;
        this._snackBar.open('Problemas al leer el archivo', '', { duration: 2000 });

      })
    })
  }


}

