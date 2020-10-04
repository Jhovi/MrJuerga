import { Component, OnInit } from '@angular/core';
import { Boleta } from '../../models/boleta';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { BoletaService } from '../../services/boleta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';

@Component({
  selector: 'app-adm-boleta',
  templateUrl: './adm-boleta.component.html',
  styleUrls: ['./adm-boleta.component.css']
})
export class AdmBoletaComponent implements OnInit {

  boletas: Boleta[];
  displayedColumns: string[] = ['id', 'nombreUsuario', 'fecha', 'direccion', 'total', 'acciones'];
  dataSource: MatTableDataSource<Boleta>;
  constructor(private boletaService: BoletaService, private usuarioService: UsuarioService, private router: Router,
    private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.findBoletas();
  }

  findBoletas() {
    this.boletaService.findAll().subscribe(boletas => {
      this.boletas = boletas;
      this.boletas.forEach(boleta => {
        this.usuarioService.findById(boleta.usuarioId).subscribe(usuario => {
          if (usuario) {
            boleta.usuario = usuario;
          }
        })
      })
      this.dataSource = new MatTableDataSource(this.boletas)

    })
  }

  onSelect(boleta: Boleta) {
    if (boleta.id) {
      let link = '../'
      this.router.navigate([link + boleta.id], { relativeTo: this.route });
    }
  }

  saveBoletaView() {
    let link = '../'
    this.router.navigate([link + "/save"], { relativeTo: this.route });
  }
}
