import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../services/usuario.service';

interface TableElement {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
}


@Component({
  selector: 'app-search-usuario',
  templateUrl: './search-usuario.component.html',
  styleUrls: ['./search-usuario.component.css']
})
export class SearchUsuarioComponent implements OnInit {
  
  datoABuscar: number;
  usuarios: Usuario[];
  constructor(public dialogRef: MatDialogRef<SearchUsuarioComponent>,
    private snackBar: MatSnackBar, private usuarioService:UsuarioService) { }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'dni'];
  dataSource = new MatTableDataSource<TableElement>();
  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(){
    this.usuarioService.findAll().subscribe(usuarios => {
        this.usuarios = usuarios;
        this.dataSource.data = this.buildTableData(this.usuarios);

    })
  }

  buildTableData(usuarios:Usuario[]){
    const data : TableElement[] = new Array();
    usuarios.forEach(e => {
      data.push({
        id: e.id,
        nombre: e.nombre,
        apellido: e.apellido,
        dni : e.dni
      })
    })
    return data;
  }

  onSelect(element: TableElement) {
    if (element.id) {
      
      this.dialogRef.close(this.usuarios.find(e => e.id === element.id));
      
    }
  }
}
