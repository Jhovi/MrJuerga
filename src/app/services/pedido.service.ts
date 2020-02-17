import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

getPedido(codPedido: number): Observable<Pedido>{
  const url = "http://localhost:8080/pedidos/" + codPedido;
  return this.http.get<Pedido>(url)
}


getPedidoSimple(codPedido: number){
  const url = "http://localhost:8080/pedidos/" + codPedido;
  let number = 0;
  console.log(number);
  this.http.get(url).subscribe(cualquierObjetoJson =>{
    number++;
    console.log(cualquierObjetoJson);
  } ,
  err => console.error(err))
  console.log(number);
  }


  findAll(): Observable<Pedido[]>{
    const url = "http://localhost:8080/pedidos/"
    return this.http.get<Pedido[]>(url)
  }

  create(pedidoNuevo: Pedido): Observable<number> {
    const url = "http://localhost:8080/pedidos/"
    return this.http.post<number>(url,pedidoNuevo)
  }

  update(pedido:Pedido): Observable<void>{
    const url = "http://localhost:8080/pedidos/" + pedido.codPedido
    return this.http.put<void>(url,pedido)
  }
}
