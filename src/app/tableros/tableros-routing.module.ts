import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmTablerosComponent } from './pages/adm-tableros/adm-tableros.component';


const routes: Routes = [
  {
    path: 'adm',
    component: AdmTablerosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablerosRoutingModule { }
