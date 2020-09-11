import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './shared/pages/base-layout/base-layout.component';
import { AuthModule } from './auth/auth.module';
import { AuthLayoutComponent } from './shared/pages/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: 'auth', 
    component: AuthLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      { path: 'productos', loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule) },
      { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
      { path: 'boletas', loadChildren: () => import('./boleta/boleta.module').then(m => m.BoletaModule) },
      { path: 'tableros', loadChildren: () => import('./tableros/tableros.module').then(m => m.TablerosModule) },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
