import { Factura } from "./factura.model";
import { Servicio } from "./servicio.model";

export class Cuota {
    id?: number;
    nombre?: string;
    monto?: number;
    estado?: string;
    servicioId?: Servicio;
    servicios?: Servicio[];
    facturaId?: Factura;

}
