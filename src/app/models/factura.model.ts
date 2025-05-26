import { Cuota } from "./cuota.model";

export class Factura {
    id?: number;
    detalle?: string;
    fechaPago?: Date;
    idCuota?: Cuota;
    cuotas?: Cuota[];
}
