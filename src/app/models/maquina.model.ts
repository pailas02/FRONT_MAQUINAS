// src/app/models/maquina.model.ts

export class Maquina {
    public id?: number;
    public especialidad?: string;
    public marca?: string;
    public modelo?: string;
    public estado?: string;
    public ubicacion?: string;
    public disponibilidad?: boolean; // Booleano para disponibilidad
    public fecha_asignacion?: string; // Fecha de asignación (como string para campos de input de fecha)
    public created_at?: string;
    public updated_at?: string;

    constructor(data?: Partial<Maquina>) {
        Object.assign(this, data);
    }
}