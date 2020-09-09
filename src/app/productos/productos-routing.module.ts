import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosModule } from './productos.module';
import { AdmProductosComponent } from './pages/adm-productos/adm-productos.component';
import { SaveProductoComponent } from './pages/save-producto/save-producto.component';
import { ProductsByCategoryComponent } from './pages/products-by-category/products-by-category.component';


const routes: Routes = [
  {
    path: 'adm',
    component: AdmProductosComponent,
  },
  {
    path: 'save',
    component: SaveProductoComponent,
    data: { role: 'create' }
  },
  {
    path: ':id',
    component: SaveProductoComponent,
    data: { role: 'view' }
  },
  {
    path: ':id/update',
    component: SaveProductoComponent,
    data: { role: 'edit' }
  },
  {
    path: 'category/:category',
    component: ProductsByCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
