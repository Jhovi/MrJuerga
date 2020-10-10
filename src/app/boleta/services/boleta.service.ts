import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Boleta } from '../models/boleta';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  
  readonly apiUrl: string = environment.apiUrl + 'Boleta';
  constructor(private http:HttpClient) { }

  create(boleta:Boleta):Observable<boolean>{
    const url =this.apiUrl;
    return this.http.post<boolean>(url,boleta);
  }

  edit(boleta:Boleta):Observable<boolean>{
    const url = this.apiUrl;
    return this.http.put<boolean>(url,boleta);
  }

  findAll():Observable<Boleta[]>{
    const url = this.apiUrl;
    return this.http.get<Boleta[]>(url);
  }

  findById(id:number):Observable<Boleta>{
    const url = this.apiUrl + "/" + id;
    return this.http.get<Boleta>(url)
  }

  findByEstado(estado: string): Observable<Boleta[]>{
    const url = this.apiUrl + "/FetchByStatus?=" + estado;
    return this.http.get<Boleta[]>(url);
  }
}
