import { Cuotas } from "./cuota.model";

export class Factura {
    id?: number;
    detalle?: string;
    fechaPago?: Date;
    idCuota?: Cuotas;
    cuotas?: Cuotas[];
}
