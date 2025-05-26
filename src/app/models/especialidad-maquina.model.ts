import { Maquina } from "./maquina.model";
import { TipoServicio } from "./tipo-servicio.model";

export class EspecialidadMaquina {
    id?: number;
    tipoEspecialidadId?: TipoServicio;
    maquinaId?: Maquina;
}
