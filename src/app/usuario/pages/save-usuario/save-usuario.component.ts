import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-save-usuario',
  templateUrl: './save-usuario.component.html',
  styleUrls: ['./save-usuario.component.css']
})
export class SaveUsuarioComponent implements OnInit {
  fechaNacimiento: Date;
  salirLink = '';
  role = '';
  usuario = new Usuario();
  currentPassword: string;
  password: string = '';
  confirmPassword: string;
  passwordIguales: boolean;
  minLength: number;
  currentPasswordHidden: boolean;
  passwordHidden: boolean;
  confirmPasswordHidden: boolean;

  loggedUser: Usuario = new Usuario();

  imagenGeneroMap: Map<number, string> = new Map([
    [0, 'assets/images/avatar_hombre.jpg'],
    [1, 'assets/images/avatar_femenino.png'],
    [2, 'assets/images/avatar_desconocido.png']
  ]);


  imagenToGeneroMap: Map<string, number> = new Map([
    ['assets/images/avatar_hombre.jpg', 0],
    ['assets/images/avatar_femenino.png', 1],
    ['assets/images/avatar_desconocido.png', 2]
  ]);


  todo = [
    'assets/images/avatar_hombre.jpg',
    'assets/images/avatar_femenino.png',
    'assets/images/avatar_desconocido.png'
  ];

  done = [

  ];


  constructor(private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {

    this.minLength = 6;
    this.passwordIguales = true;
    this.currentPasswordHidden = true;
    this.passwordHidden = true;
    this.confirmPasswordHidden = true;
    this.route.data.subscribe(e => { this.role = e.role })

    if (this.role === 'create') {
      this.salirLink = '../adm'
    } else if (this.role === 'edit') {
      this.salirLink = '../'
      this.getUsuario()
    } else if (this.role === 'view') {
      this.salirLink = '../adm'
      this.getUsuario()
    }
  }

  getUsuario() {
    const id = +(this.route.snapshot.paramMap.get('id'));
    this.usuarioService.findById(id).subscribe(usuario => {
      this.usuario = usuario;
      this.password = this.usuario.password;
      this.confirmPassword = this.usuario.password;
      this.done = [this.imagenGeneroMap.get(this.usuario.genero)];
      this.todo = this.todo.filter(e => e != this.imagenGeneroMap.get(this.usuario.genero))
    })
  }



  saveUsuario({ value, valid }: { value: Usuario, valid: boolean }) {
    let link = '../';
    let url = '../';
    this.usuario.genero = this.imagenToGeneroMap.get(this.done.toString())
    if (valid) {
      if (this.usuario.id) {
        this.usuarioService.edit(this.usuario).subscribe(id => {
          this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
          this.router.navigate([link + url + 'adm'], { relativeTo: this.route });
        },
          err => {
            this._snackBar.open(err, '', { duration: 2000 });
          })
      } else {
        this.usuario.password = this.password;
        this.usuario.estado = 'Activo';
        this.usuarioService.create(this.usuario).subscribe(id => {
          this._snackBar.open('Creación con éxito', '', { duration: 2000 });
          this.router.navigate([link + 'adm'], { relativeTo: this.route });
        }, err => {
          this._snackBar.open(err, '', { duration: 2000 });

        })
      }

    }
  }


  verificarPasswordIguales(): void {
    if (this.password.length > 0 || this.confirmPassword.length > 0) {
      if (this.password != this.confirmPassword) {
        this.passwordIguales = false;
      } else {
        this.passwordIguales = true;
      }
    }
  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }


  }


}
