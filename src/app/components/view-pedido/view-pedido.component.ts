import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-view-pedido',
  templateUrl: './view-pedido.component.html',
  styleUrls: ['./view-pedido.component.css']
})
export class ViewPedidoComponent implements OnInit {

  pedido : Pedido;
  constructor(private route: ActivatedRoute, private pedidoService: PedidoService) { }

  ngOnInit(): void {

    let codPedido = +this.route.snapshot.paramMap.get('codPedido')

    this.pedidoService.getPedido(codPedido).subscribe(
      pedidoObtenido => {
        this.pedido = pedidoObtenido
      },
      err => console.error(err)
    )
  }




}
