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
import { AddDetalleComponent } from '../../components/add-detalle/add-detalle.component';
import { Producto } from 'src/app/productos/models/producto';



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
  cantidad = 1;
  producto: Producto;
  boleta = new Boleta();
  usuario: Usuario = new Usuario();
  detallesBoleta: DetalleBoleta[] = new Array();
  displayedColumns: string[] = ['codProducto', 'nombreProducto', 'precioProducto', 'cantidad', 'subtotal'];
  dataSource = new MatTableDataSource<DetalleBoleta>();

  data: DetalleBoleta[] = new Array();
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
            this.dataSource = new MatTableDataSource(this.detallesBoleta);
          })
        })
      })
    })
  }

  saveBoleta({ value, valid }: { value: Boleta, valid: boolean }) {
    let link = '../';
    let url = '../';

    this.boleta.usuarioId = this.usuario.id;
    this.boleta.detalleBoleta = new Array<DetalleBoleta>();
   
    if (valid) {
      if (this.boleta.id) {
        this.boleta.detalleBoleta = this.detallesBoleta;
        this.boletaService.edit(this.boleta).subscribe(id => {
          this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
          this.router.navigate([link + url + 'adm'], { relativeTo: this.route });
        },
          err => {
            this._snackBar.open(err, '', { duration: 2000 });
          })
      } else {
        this.detallesBoleta.forEach(detalle => {
          var detalle: DetalleBoleta = new DetalleBoleta(detalle.cantidad, detalle.productoId)
          this.boleta.detalleBoleta.push(detalle);
        })
        this.boletaService.create(this.boleta).subscribe(id => {
          this._snackBar.open('Creación con éxito', '', { duration: 2000 });
          this.router.navigate([link + 'adm'], { relativeTo: this.route });
        }, err => {
          this._snackBar.open(err, '', { duration: 2000 });
        })
      }
    }
  }

  addDetalle() {
    const dialogRef = this.dialog.open(AddDetalleComponent, {
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(producto => {
      if (producto) {
        this.producto = producto;
        if (this.detallesBoleta.length == 0) {
          this.detallesBoleta.push({
            boletaId: this.boleta.id,
            cantidad: this.cantidad,
            id: null,
            producto: this.producto,
            productoId: this.producto.id,
            subtotal: this.cantidad * this.producto.precio
          })
        } else {
          this.detallesBoleta.forEach(detalle => {
            var sonIguales = (detalle.productoId == this.producto.id)
            var existeProducto = (this.detallesBoleta.find(e => e.productoId == this.producto.id)) ? true : false;

            if ((!sonIguales && !existeProducto)) {
              this.detallesBoleta.push({
                boletaId: this.boleta.id,
                cantidad: this.cantidad,
                id: null,
                producto: this.producto,
                productoId: this.producto.id,
                subtotal: this.cantidad * this.producto.precio
              })
            } else {
              this._snackBar.open('Producto: ' + this.producto.nombre + ' ya fue registrado', '', { duration: 2000 });
            }
          })
        }
        this.dataSource.data = this.detallesBoleta;
      }
    }
    );
  }

  actualizarSubTotal(element: DetalleBoleta) {
    this.detallesBoleta.forEach(detalle => {
      if (detalle.productoId == element.productoId) {
        if (element.producto.stock >= element.cantidad) {
          detalle.cantidad = element.cantidad
          detalle.subtotal = element.cantidad * element.producto.precio
        } else {
          this._snackBar.open('No hay suficiente stock', '', { duration: 2000 });
          detalle.cantidad = 0;
          detalle.subtotal = 0;
        }
      }
    })
    this.dataSource.data = this.detallesBoleta
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.subtotal).reduce((acc, value) => acc + value, 0);
  }
}
