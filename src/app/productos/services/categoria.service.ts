import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  readonly apiUrl: string = environment.apiUrl + 'Categoria';
  constructor(private http:HttpClient) { }


  findAll(): Observable<Categoria[]> {
    const url =this.apiUrl;
    return this.http.get<Categoria[]>(url);
  }

  findById(id: number): Observable<Categoria> {
    const url =this.apiUrl + '/' + id;
    return this.http.get<Categoria>(url);
  }
}
