import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { AuthenticatedUser } from 'src/app/auth/models/authenticated-user';
import { map } from 'rxjs/operators';

const httpOptions = {
  'responseType': 'arraybuffer' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private authenticatedUserSubject: BehaviorSubject<AuthenticatedUser>;
  public authenticatedUser: Observable<AuthenticatedUser>;
  readonly apiUrl: string = environment.apiUrl + 'Usuario';

  constructor(private http: HttpClient,) {
    this.authenticatedUserSubject = new BehaviorSubject<AuthenticatedUser>(JSON.parse(localStorage.getItem('authenticatedUser')));
    this.authenticatedUser = this.authenticatedUserSubject.asObservable()
  }

  public get authenticatedUserValue(): AuthenticatedUser {
    return this.authenticatedUserSubject.value;
  }

  findAll(): Observable<Usuario[]> {
    const url = this.apiUrl;
    return this.http.get<Usuario[]>(url);
  }

  edit(usuario: Usuario): Observable<boolean> {
    const url = this.apiUrl;
    return this.http.put<boolean>(url, usuario);
  }

  create(usuario: Usuario): Observable<boolean> {
    const url = this.apiUrl + "/register";
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

  login(correo: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, { 'correo': correo, 'password': password })
      .pipe(map(authenticatedUser => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
        this.authenticatedUserSubject.next(authenticatedUser);
        return authenticatedUser;
      }))
  }

  logout(){
    localStorage.removeItem('authenticatedUser');
    this.authenticatedUserSubject.next(null);
  }
}
