import { Usuario } from 'src/app/usuario/models/usuario';
import { Producto } from 'src/app/productos/models/producto';

export interface ConfiguracionAccion {
    estadoOrigen: string,
    accion: string,
    estadoDestino: string
  }

export class Boleta {
    id: number;
    usuarioId: number;
    usuario: Usuario;
    fecha: string;
    direccion: string;
    total: string;
    estado: string;
    detalleBoleta: DetalleBoleta[];

    public static readonly configuracionesAccion: ConfiguracionAccion[] = [
        { accion: 'Aprobar', estadoOrigen: 'Registrado', estadoDestino: 'Anulado' },
        { accion: 'Anular', estadoOrigen: 'Registrado', estadoDestino: 'Anulado' },
    ];
}




export class DetalleBoleta {
    id: number;
    productoId: number;
    producto: Producto;
    boletaId: number;
    cantidad: number;
    subtotal: number;

    constructor( cantidad?: number, productoId?: number) {
        this.cantidad = cantidad;
        this.productoId = productoId;
    }


}

