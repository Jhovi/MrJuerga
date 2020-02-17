import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-adm-pedido',
  templateUrl: './adm-pedido.component.html',
  styleUrls: ['./adm-pedido.component.css']
})
export class AdmPedidoComponent implements OnInit {

  pedidos: Pedido[] = new Array

  modoActualizar: boolean = false;

  pedidoNuevo: Pedido = new Pedido()
  pedidoAActualizar: Pedido
  constructor(private pedidoService:PedidoService) {

    
   }

  ngOnInit(): void {

    //this.pedidoService.getPedidoSimple(1);

    this.pedidoService.findAll().subscribe(
      pedidosObtenidos => {
       this.pedidos = pedidosObtenidos
      },
      err => console.error(err)
    )

  }


  agregarPedido(){
    this.pedidoService.create(this.pedidoNuevo).subscribe( 
      codPedido => {
       
        this.pedidoNuevo.codPedido = codPedido;
        this.pedidos.push(this.pedidoNuevo);
        this.pedidoNuevo = new Pedido();
      },
      err => console.error(err)
      )
  }


  mostrarPedidoAActualizar(pedidoAAcctualizar: Pedido){
    this.modoActualizar = true;
   this.pedidoAActualizar = pedidoAAcctualizar;
   
   
  
   
  }

  guardarPedido(){
    
   this.pedidoService.update(this.pedidoAActualizar).subscribe(
    () => {
     this.modoActualizar=false;
    },
    err => console.error(err)
  )
  }
}
