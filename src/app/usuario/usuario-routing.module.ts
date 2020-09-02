import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmUsuariosComponent } from './pages/adm-usuarios/adm-usuarios.component';
import { SaveUsuarioComponent } from './pages/save-usuario/save-usuario.component';


const routes: Routes = [
  {
    path: 'adm',
    component: AdmUsuariosComponent,
  },
  {
    path: 'save',
    component: SaveUsuarioComponent,
    data: { role: 'create' }
  },
  {
    path: ':id',
    component: SaveUsuarioComponent,
    data: { role: 'view' }
  },
  {
    path: ':id/update',
    component: SaveUsuarioComponent,
    data: { role: 'edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
