import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmBoletaComponent } from './pages/adm-boleta/adm-boleta.component';
import { SaveBoletaComponent } from './pages/save-boleta/save-boleta.component';


const routes: Routes = [
  {
    path: 'adm',
    component: AdmBoletaComponent,
  },
  {
    path: 'save',
    component: SaveBoletaComponent,
    data: { role: 'create' }
  },
  {
    path: ':id',
    component: SaveBoletaComponent,
    data: { role: 'view' }
  },
  {
    path: ':id/update',
    component: SaveBoletaComponent,
    data: { role: 'edit' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoletaRoutingModule { }
