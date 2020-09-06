import { Usuario } from 'src/app/usuario/models/usuario';
import { Producto } from 'src/app/productos/models/producto';

export class Boleta {
    id:number;
    usuarioId:number;
    usuario:Usuario;
    fecha:string;
    direccion:string;
    total:string;
    detalleBoleta:DetalleBoleta[];

}


export class DetalleBoleta {
    id:number;
    productoId:number;
    producto:Producto;
    boletaId:number;
    cantidad:number;
    subtotal:number;   
    
    constructor(cantidad?:number, productoId?:number) {
       this.cantidad = cantidad;
       this.productoId = productoId;        
    }
}

