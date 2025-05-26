import { Novedad } from "./novedad.model";
import { Servicio } from "./servicio.model";

export class Evidencia {
    id?: number;
    contenido?: string;
    tipo?: string;
    servicioId?: Servicio;
    NovedadId?: Novedad;
}
