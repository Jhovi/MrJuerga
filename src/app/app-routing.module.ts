import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPedidoComponent } from './components/view-pedido/view-pedido.component';
import { AdmPedidoComponent } from './components/adm-pedido/adm-pedido.component';


const routes: Routes = [

  
  { path: '', component: AdmPedidoComponent },
  { path: ':codPedido', component: ViewPedidoComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
