import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-save-producto',
  templateUrl: './save-producto.component.html',
  styleUrls: ['./save-producto.component.css']
})
export class SaveProductoComponent implements OnInit {

  salirLink = '';
  role = '';
  producto = new Producto();

  constructor(private productoService:ProductoService,
    private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {  
    this.route.data.subscribe(e => { this.role = e.role })


    
    if (this.role === 'create') {
      this.salirLink = '../adm'
    } else if (this.role === 'edit') {
      this.salirLink = '../'
      this.getProducto()
    } else if (this.role === 'view') {
      this.salirLink = '../adm'
      this.getProducto()
    }
  }

  getProducto(){
    const id = +(this.route.snapshot.paramMap.get('id'));
    this.productoService.findById(id).subscribe(producto => {
      this.producto = producto;
    })
  }

  saveProducto({ value, valid }: { value: Producto, valid: boolean }){
    let link = '../';
    let url = '../';

    if (valid){ 
      if (this.producto.id){
        this.productoService.edit(this.producto).subscribe(id => {
          this._snackBar.open('Actualizacion con éxito', '', { duration: 2000 });
          this.router.navigate([link + url + 'adm'], { relativeTo: this.route });
        },
          err => {
            this._snackBar.open(err, '', { duration: 2000 });
        })
      }else {
        this.producto.estado = 'activo';
        this.productoService.create(this.producto).subscribe(id => {
          this._snackBar.open('Creación con éxito', '', { duration: 2000 });
          this.router.navigate([link + 'adm'], { relativeTo: this.route });
        },  err => {
          this._snackBar.open(err, '', { duration: 2000 });
  
        })
      }

    }
  }
}
