import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoletaRoutingModule } from './boleta-routing.module';
import { AdmBoletaComponent } from './pages/adm-boleta/adm-boleta.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SaveBoletaComponent } from './pages/save-boleta/save-boleta.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from  '@angular/forms'
import {MatSelectModule} from '@angular/material/select';
import { AddDetalleComponent } from './components/add-detalle/add-detalle.component';

@NgModule({
  declarations: [AdmBoletaComponent, SaveBoletaComponent, AddDetalleComponent],
  imports: [
    CommonModule,
    BoletaRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
  ]
})
export class BoletaModule { }
