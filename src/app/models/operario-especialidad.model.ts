export class OperarioEspecialidad {
    id?: number;
    operario_id?: number;
    especialidad_id?: number;
    created_at?: string;
    updated_at?: string;
    
    constructor(
        id?: number,
        operario_id?: number,
        especialidad_id?: number,
        created_at?: string,
        updated_at?: string
    ) {
        this.id = id;
        this.operario_id = operario_id;
        this.especialidad_id = especialidad_id;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
