import { Injectable } from '@angular/core';

interface MenuOption {
  name: string;
  path: string;
  offLine: boolean;
}
export interface Module {
  name: string;
  options: MenuOption[];
}


@Injectable({
  providedIn: 'root'
})
export class OpcionService {

  modules: Module[] = [
    {
      name: 'Productos',
      options: [
        { name: 'Productos', path: '/productos/adm', offLine: false },
      ]
    },
    {
      name: 'Usuarios',
      options: [
        { name: 'Usuarios', path: '/usuarios/adm', offLine: false },
      ]
    },
    {
      name: 'Boletas',
      options: [
        { name: 'Boletas', path: '/boletas/adm', offLine: false },
      ]
    },
  ]
  constructor() { }

  getOpciones(): Module[] {
    return this.modules;
  }
}
