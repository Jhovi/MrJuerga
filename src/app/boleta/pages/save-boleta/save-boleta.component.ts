import { Component, OnInit } from '@angular/core';
import { Boleta, DetalleBoleta } from '../../models/boleta';
import { ProductoService } from 'src/app/productos/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoletaService } from '../../services/boleta.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/models/usuario';
import { MatDialog } from '@angular/material/dialog';
import { SearchUsuarioComponent } from 'src/app/usuario/components/search-usuario/search-usuario.component';

interface TableElement {
  codProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioProducto: number;
  subtotal: number;
}

@Component({
  selector: 'app-save-boleta',
  templateUrl: './save-boleta.component.html',
  styleUrls: ['./save-boleta.component.css']
})
export class SaveBoletaComponent implements OnInit {

  nombreCompleto = '';
  opcionSeleccionada = '';
  salirLink = '';
  role = '';
  boleta = new Boleta();
  usuario: Usuario = new Usuario();
  detallesBoleta: DetalleBoleta[] = new Array();
  displayedColumns: string[] = ['codProducto', 'nombreProducto', 'cantidad', 'precioProducto', 'subtotal'];
  dataSource = new MatTableDataSource<TableElement>();

  constructor(private productoService: ProductoService, private boletaService: BoletaService,
    private usuarioService: UsuarioService, private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog,) { }

  ngOnInit(): void {

    this.route.data.subscribe(e => { this.role = e.role })

    if (this.role === 'create') {
      this.salirLink = '../adm'
    } else if (this.role === 'edit') {
      this.salirLink = '../'
      this.getBoleta()
    } else if (this.role === 'view') {
      this.salirLink = '../adm'
      this.getBoleta()
    }
  }

  seleccionarUsuario() {
    const dialogRef = this.dialog.open(SearchUsuarioComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(usuario => {
      if (usuario) {
        this.usuario = usuario;
        this.nombreCompleto = this.usuario.nombre.concat(' ', this.usuario.apellido)
      }
    }
    );
  }

  getBoleta() {
    const id = +(this.route.snapshot.paramMap.get('id'));
    this.boletaService.findById(id).subscribe(boleta => {
      this.boleta = boleta;
      this.usuarioService.findById(boleta.usuarioId).subscribe(usuario => {
        this.usuario = usuario;
        this.nombreCompleto = this.usuario.nombre.concat(' ', this.usuario.apellido)
        this.boleta.detalleBoleta.forEach(detalle => {
          this.productoService.findById(detalle.productoId).subscribe(producto => {
            detalle.producto = producto;
            this.detallesBoleta.push(detalle);
            this.dataSource.data = this.buildTable();
          })
        })
      })
    })
  }

  buildTable() {
    const data: TableElement[] = new Array();
    this.detallesBoleta.forEach(e => {
      data.push({
        codProducto: e.productoId,
        cantidad: e.cantidad,
        nombreProducto: e.producto.nombre,
        precioProducto: e.producto.precio,
        subtotal: (e.cantidad * e.producto.precio)
      })
    })
    return data;
  }

  saveBoleta({ value, valid }: { value: Boleta, valid: boolean }) {
    let link = '../';
    let url = '../';

    if (valid) {
      if (this.boleta.id) {
        this.boletaService.edit(this.boleta).subscribe(id => {
          this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
          this.router.navigate([link + url + 'adm'], { relativeTo: this.route });
        },
          err => {
            this._snackBar.open(err, '', { duration: 2000 });
          })
      } else {
        this.boletaService.create(this.boleta).subscribe(id => {
          this._snackBar.open('Creación con éxito', '', { duration: 2000 });
          this.router.navigate([link + 'adm'], { relativeTo: this.route });
        }, err => {
          this._snackBar.open(err, '', { duration: 2000 });
        })
      }
    }
  }

}
