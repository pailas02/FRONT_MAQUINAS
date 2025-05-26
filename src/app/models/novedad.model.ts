import { Turno } from "./turno.model";

export class Novedad {
    id?: number;
    turnoId?: Turno;
    tipo?: string;
    descripcion?: string;
    evidencia?: string;
    estado?: string;
    fecha?: Date;
    gravedad?: string;
}
