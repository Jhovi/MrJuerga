import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SaveProductoDialogComponent } from '../../components/save-producto-dialog/save-producto-dialog.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-adm-productos',
  templateUrl: './adm-productos.component.html',
  styleUrls: ['./adm-productos.component.css']
})
export class AdmProductosComponent implements OnInit {

  productos: Producto[];
  displayedColumns: string[] = ['codProducto', 'nombre', 'descripcion', 'precio', 'categoria', 'stock', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  constructor(private productoService: ProductoService, private router: Router,
    private categoriaService: CategoriaService,
    public dialog: MatDialog, 
    private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.findProductos();
  }


  findProductos() {
    this.productoService.findAll().subscribe(productos => {
      this.productos = productos;
      this.productos = this.productos.filter(producto => producto.estado == 'activo')
      this.productos.forEach(p => {
        this.categoriaService.findById(p.categoriaId).subscribe(categoria => {
          p.categoria = categoria;
        })
      })
      this.dataSource = new MatTableDataSource(this.productos)
    })
  }

  onSelect(producto: Producto) {
    const dialogRef = this.dialog.open(SaveProductoDialogComponent, {
      width: '400px',
      data: {
        role: "edit",
        producto: { ...producto }
      }
    });

    dialogRef.afterClosed().subscribe(producto => {
      if (producto) {
        this.findProductos();
        this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
      }

    });
  }

  saveProductoView() {
    const dialogRef = this.dialog.open(SaveProductoDialogComponent, {
      width: '400px',
      data: {
        role: "create"
      }
    });

    dialogRef.afterClosed().subscribe(producto => {
      if (producto) {
        this.findProductos();
        this._snackBar.open('Creación con éxito', '', { duration: 2000 });
      }
    });
  }

  eliminar(producto: Producto) {
    this.productoService.deleteById(producto).subscribe(() => {
      this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
      this.findProductos();
    },
      err => {
        this._snackBar.open(err, '', { duration: 2000 });
      })
  }
}
