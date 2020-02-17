import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmPedidoComponent } from './components/adm-pedido/adm-pedido.component';
import { FormsModule }   from '@angular/forms';
import { ViewPedidoComponent } from './components/view-pedido/view-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    AdmPedidoComponent,
    ViewPedidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
