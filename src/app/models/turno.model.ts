import { Maquina } from "./maquina.model";
import { Novedad } from "./novedad.model";

export class Turno {
  id?: number;
  maquinaId?: number;
  operarioId?: number;
  estado?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
}

