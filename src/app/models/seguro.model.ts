import { Maquina } from "./maquina.model";
import { Operario } from "./operario.model";

export class Seguro {
    id?: number;
    nombre?: string;
    descripcion?: string;
    costo?: number;
    maquianaId?: Maquina;
    maquinas?: Maquina[];
    operarioId?: Operario;
    operarios?: Operario[];
    
}
