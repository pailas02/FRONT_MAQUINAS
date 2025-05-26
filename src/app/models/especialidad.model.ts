import { Maquina } from "./maquina.model";
import { Operario } from "./operario.model";
import { TipoServicio } from "./tipo-servicio.model";

export class Especialidad {
    id?: number;
    nombre?: string;
    descripcion?: string;
    operarioId?: Operario;
    
}
