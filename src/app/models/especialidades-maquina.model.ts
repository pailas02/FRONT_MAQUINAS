import { Maquina } from './maquina.model';
import { TipoServicio } from './tipo-servicio.model';

export class EspecialidadesMaquina {
  id?: number;
  idMaquina?: number;
  idTipoServicio?: number;
  maquina?: Maquina;
  tipoServicio?: TipoServicio;
}
