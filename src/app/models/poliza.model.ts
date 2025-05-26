import { Maquina } from "./maquina.model";
import { Operario } from "./operario.model";
import { Seguro } from "./seguro.model";

export class Poliza {
    id?: number;
    operarioId?: Operario;
    operarios?: Operario[];
    maquinaId?: Maquina;
    maquinas?: Maquina[];
    seguroId?: Seguro;
    seguros?: Seguro[];
    fechaInicio?: Date;
    fechaFin?: Date;
    estado?: string;
}
