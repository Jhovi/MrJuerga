import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../models/categoria';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';


@Component({
  selector: 'app-save-producto-dialog',
  templateUrl: './save-producto-dialog.component.html',
  styleUrls: ['./save-producto-dialog.component.css']
})
export class SaveProductoDialogComponent implements OnInit {
  role = '';
  salirLink = '';
  producto = new Producto();
  selectCategoryList: String[] = ["Whisky", "Ron", "Cerveza", "Vino", "Vodka", "Tequila", "Piqueos", "Otros"]
  nombreCategoria: string = '';

  constructor(public dialogRef: MatDialogRef<SaveProductoDialogComponent>, private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: { role: string, producto?: Producto }) { }

  ngOnInit(): void {
    if (this.data) {
      this.role = this.data.role;
      if (this.data.producto) {
        this.producto = this.data.producto;
        this.nombreCategoria = this.producto.categoria.nombre;
      }
    }
  }

  saveProducto({ value, valid }: { value: Producto, valid: boolean }) {
    if (valid) {
      this.producto.categoriaId = Categoria.categoriaToIdCategoria.get(this.nombreCategoria);
      if (this.producto.id) {
        this.productoService.edit(this.producto).subscribe(() => {
          this.dialogRef.close(this.producto);
        },
          err => {

          })
      } else {
        this.producto.estado = 'activo';
        this.productoService.create(this.producto).subscribe(() => {
          this.dialogRef.close(this.producto);
        }, err => {
        })
      }

    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }
}
