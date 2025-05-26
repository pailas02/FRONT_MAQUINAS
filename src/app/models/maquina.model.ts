import { Combo } from "./combo.model";
import { Gps } from "./gps.model";
import { Mantenimiento } from "./mantenimiento.model";
import { Operario } from "./operario.model";
import { Seguro } from "./seguro.model";
import { TipoServicio } from "./tipo-servicio.model";

export class Maquina {
    id?: number;
    especialidad?: string;
    marca?: string;
    modelo?: string;
    estado?: string;
    ubicacion?: string;
    disponibilidad?: string;
    fecha_asignacion?: string;
    fecha_retiro?: string;
}
