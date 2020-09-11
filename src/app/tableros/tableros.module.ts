import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablerosRoutingModule } from './tableros-routing.module';
import { AdmTablerosComponent } from './pages/adm-tableros/adm-tableros.component';
import { TopProductosVendidosComponent } from './components/top-productos-vendidos/top-productos-vendidos.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TopUsuarioMasGastanComponent } from './components/top-usuario-mas-gastan/top-usuario-mas-gastan.component';


@NgModule({
  declarations: [AdmTablerosComponent, TopProductosVendidosComponent, TopUsuarioMasGastanComponent],
  imports: [
    CommonModule,
    TablerosRoutingModule,
    FormsModule,
    ChartsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class TablerosModule { }
