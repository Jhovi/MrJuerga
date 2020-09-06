import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/productos/models/producto';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ProductoService } from 'src/app/productos/services/producto.service';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-add-detalle',
  templateUrl: './add-detalle.component.html',
  styleUrls: ['./add-detalle.component.css']
})
export class AddDetalleComponent implements OnInit {

  productos:Producto[];
  producto: Producto;
  opcionBusqueda = 'NOMBRE';
  datoABuscar: any;
  opcionesBusqueda = [
    { key: 'NOMBRE', viewValue: 'Nombre' },
    { key: 'ID', viewValue: 'Codigo' },
  ];
  displayedColumns: string[] = ['codProducto', 'nombreProducto', 'precio', 'stock'];
  dataSource = new MatTableDataSource<Producto>();
  constructor(private productoService: ProductoService,
    public dialogRef: MatDialogRef<AddDetalleComponent>) { }

  ngOnInit(): void {
    this.productoService.findAll().subscribe(productos => {
      this.productos = productos;
      this.productos = this.productos.filter(producto => producto.stock > 0)
      this.dataSource = new MatTableDataSource(this.productos);
    })
  }

  onSearch(){
    if (this.opcionBusqueda === 'NOMBRE'){
      this.productoService.findByNombreContaining(this.datoABuscar).subscribe(
        productos => {
          this.productos = productos;
          this.dataSource = new MatTableDataSource(this.productos);
        }
      )
    } else {
      this.productoService.findById(this.datoABuscar).subscribe(
        producto => {
          this.productos = [producto];
          this.dataSource = new MatTableDataSource(this.productos);
        }
      )
    }
  }

  onSelect(producto: Producto) {
    if (producto.id) {
      
      this.dialogRef.close(this.productos.find(e => e.id === producto.id));
      
    }
  }

}
