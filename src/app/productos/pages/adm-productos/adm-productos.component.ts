import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adm-productos',
  templateUrl: './adm-productos.component.html',
  styleUrls: ['./adm-productos.component.css']
})
export class AdmProductosComponent implements OnInit {

  productos : Producto[];
  displayedColumns: string[] = ['codProducto', 'nombre', 'descripcion', 'precio','categoria', 'stock', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  constructor(private productoService:ProductoService,private router: Router, 
    private route: ActivatedRoute,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.findProductos();
  }


  findProductos(){
    this.productoService.findAll().subscribe(productos => {
      this.productos = productos;
      this.productos = this.productos.filter(producto => producto.estado == 'activo')
      this.dataSource = new MatTableDataSource(this.productos)
    })
  }

  onSelect(producto:Producto){
    if (producto.id) {
      let link = '../'
      this.router.navigate([link + producto.id ], { relativeTo: this.route });
    }
  }
  
  saveProductoView(){
    let link = '../'
    this.router.navigate([link + "/save" ], { relativeTo: this.route });
  }

  eliminar(producto:Producto){
    this.productoService.deleteById(producto).subscribe( () => {
      this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
      this.findProductos();
    },
      err => {
        this._snackBar.open(err, '', { duration: 2000 });
    })
  }
}
