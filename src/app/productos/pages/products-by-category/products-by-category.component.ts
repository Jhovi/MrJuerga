import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Producto } from '../../models/producto';
import { MatDialog } from '@angular/material/dialog';
import { SaveProductoDialogComponent } from '../../components/save-producto-dialog/save-producto-dialog.component';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {

  productos: Producto[] = new Array();
  constructor(private productoService: ProductoService, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,
    private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getProductoByCategoria();
  }

  getProductoByCategoria() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let category = params.get('category');
      this.productoService.findByCategory(category).subscribe(productos => {
        this.productos = productos;
        this.productos.forEach(producto => {
          this.productoService.findImagen(producto.nombre).subscribe(imagen => {
            this.categoriaService.findById(producto.categoriaId).subscribe(categoria => {
              producto.categoria = categoria;
              producto.imagen = 'data:image/jpeg;base64,' + imagen;
            })
          })
        })
      })
    })

  }

  verProducto(producto: Producto) {

    const dialogRef = this.dialog.open(SaveProductoDialogComponent, {
      width: '400px',
      data: {
        role: "view",
        producto: { ...producto }
      }
    });

    dialogRef.afterClosed().subscribe(() => {


    });

  }
}
