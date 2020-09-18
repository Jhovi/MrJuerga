import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';

const httpOptions = {
  'responseType': 'arraybuffer' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  readonly apiUrl: string = environment.apiUrl + 'Usuario';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]> {
    const url = this.apiUrl;
    return this.http.get<Usuario[]>(url);
  }

  edit(usuario: Usuario): Observable<boolean> {
    const url = this.apiUrl;
    return this.http.put<boolean>(url, usuario);
  }

  create(usuario: Usuario): Observable<boolean> {
    const url = this.apiUrl;
    return this.http.post<boolean>(url, usuario);
  }

  delete(usuario: Usuario): Observable<boolean> {
    const url = this.apiUrl + "/" + usuario.id;
    return this.http.put<boolean>(url, usuario);
  }

  findById(id: number): Observable<Usuario> {
    const url = this.apiUrl + "/" + id;
    return this.http.get<Usuario>(url);
  }

  findByNombreContaining(nombre: string): Observable<Usuario[]> {
    const url = this.apiUrl + "/fetchbyname/" + nombre;
    return this.http.get<Usuario[]>(url);
  }

  generateExcel() {
    const url = this.apiUrl + "/GetExcel";
    return this.http.get<any>(url, httpOptions);
  }
}
