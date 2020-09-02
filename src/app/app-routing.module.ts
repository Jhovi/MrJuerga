import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './shared/pages/base-layout/base-layout.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
      { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
