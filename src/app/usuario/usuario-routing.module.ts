import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuards } from '../auth/guards/auth-guards';
import { AdmUsuariosComponent } from './pages/adm-usuarios/adm-usuarios.component';
import { SaveUsuarioComponent } from './pages/save-usuario/save-usuario.component';


const routes: Routes = [
  {
    path: 'adm',
    canActivate: [AuthGuards], 
    component: AdmUsuariosComponent,
  },
  {
    path: 'save',
    component: SaveUsuarioComponent,
    data: { role: 'create' }
  },
  {
    path: ':id',
    canActivate: [AuthGuards],
    component: SaveUsuarioComponent,
    data: { role: 'view' }
  },
  {
    path: ':id/update',
    canActivate: [AuthGuards],
    component: SaveUsuarioComponent,
    data: { role: 'edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
