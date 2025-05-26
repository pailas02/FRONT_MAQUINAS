import { Mantenimiento } from "./mantenimiento.model";
import { Procedimiento } from "./procedimiento.model";

export class ProcedimientoMantenimiento {
     id?: number;
    procedimiento_id?: Procedimiento;
    mantenimiento_id?: Mantenimiento;
    estado?: string;
}
