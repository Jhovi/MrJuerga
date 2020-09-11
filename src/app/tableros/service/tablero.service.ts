import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tablero } from '../models/tablero';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableroService {

  readonly apiUrl: string = environment.apiUrl + 'Boleta';
  constructor(private http: HttpClient) { }

  getProductosMasVendidosEntreFechas(fechaDesde: string, fechaHasta: string): Observable<Tablero[]> {
    const url = this.apiUrl + "/FetchTop5Products?inicio=" + fechaDesde + "&fin=" + fechaHasta;
    return this.http.get<Tablero[]>(url);
  }

  getUsuariosConMasGastos(): Observable<Tablero[]> {
    const url = this.apiUrl + "/FetchTop5Customers";
    return this.http.get<Tablero[]>(url);
  }
}
