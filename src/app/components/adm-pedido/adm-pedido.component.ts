import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';
import { Router } from '@angular/router';



export interface TableElement {
  codPedido: number;
  codCliente: number;
  fechaPedido: string;
  prioridad: string;
}






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


  displayedColumns: string[] = ['codPedido', 'codCliente', 'fechaPedido', 'prioridad', 'acciones'];
  dataSource : TableElement[]


  constructor(private pedidoService:PedidoService, private router: Router) {

    
   }

  ngOnInit(): void {

    //this.pedidoService.getPedidoSimple(1);

    this.pedidoService.findAll().subscribe(
      pedidosObtenidos => {
       this.pedidos = pedidosObtenidos
        //Construir dataSource
        this.dataSource = [];

      this.pedidos.forEach(e => 
        this.dataSource.push({
          codPedido: e.codPedido,
          codCliente: e.codCliente,
          fechaPedido: e.fechaPedido,
          prioridad: e.prioridad
        })
        );
        


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

  verDetalle(id : number){

    this.router.navigate(['/'+ id])

  }
}
