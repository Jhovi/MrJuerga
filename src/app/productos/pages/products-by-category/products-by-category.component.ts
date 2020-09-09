import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {

  productos : Producto[] = new Array();
  constructor(private productoService:ProductoService,
    private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.getProductoByCategoria();
  }

  getProductoByCategoria(){
    const category = (this.route.snapshot.paramMap.get('category'));
    console.log(category)
    this.productoService.findByCategory(category).subscribe(productos => {
      this.productos = productos;
      console.log(this.productos);
    })
  }

  verProducto(id:number){
    if (id) {
      let link = '../../'
      this.router.navigate([link + id ], { relativeTo: this.route });
    }
  }
}
