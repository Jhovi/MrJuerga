import { Categoria } from "./categoria";

export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaId: number;
    categoria: Categoria;
    estado: string;
    stock: number;
    imagen: string;


}