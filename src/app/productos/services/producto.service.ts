import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  readonly apiUrl: string = environment.apiUrl + 'Producto';
  constructor(private http:HttpClient) { }

  create(producto:Producto):Observable<boolean>{
    const url =this.apiUrl;
    return this.http.post<boolean>(url,producto);
  }

  edit(producto:Producto):Observable<boolean>{
    const url = this.apiUrl;
    return this.http.put<boolean>(url,producto);
  }

  findAll():Observable<Producto[]>{
    const url = this.apiUrl;
    return this.http.get<Producto[]>(url);
  }

  findById(id:number):Observable<Producto>{
    const url = this.apiUrl + "/" + id;
    return this.http.get<Producto>(url);
  }

  deleteById(producto:Producto):Observable<boolean>{
    const url = this.apiUrl + "/"  + producto.id;
    return this.http.put<boolean>(url,producto);
  }

  findByNombreContaining(nombre:string):Observable<Producto[]>{
    const url = this.apiUrl + "/fetchbyname/"  + nombre;
    return this.http.get<Producto[]>(url);
  }

  findByCategory(categoria:string):Observable<Producto[]>{
    const url = this.apiUrl + "/fetchbycategory/" + categoria;
    return this.http.get<Producto[]>(url);
  }

  findImagen(name:string):Observable<string>{
    const url = this.apiUrl + "/GetImage/"  + name;
    return this.http.get<string>(url);
  }
}
