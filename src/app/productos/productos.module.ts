import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { AdmProductosComponent } from './pages/adm-productos/adm-productos.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SaveProductoComponent } from './pages/save-producto/save-producto.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule  } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [AdmProductosComponent, SaveProductoComponent, ProductsByCategoryComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class ProductosModule { }
