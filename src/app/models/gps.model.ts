// src/app/models/gps.model.ts

export class GPS {
    public id?: number;
    public latitud?: number;
    public longitud?: number;
    public maquina_id?: number; // Clave foránea para la relación con Maquina
    public created_at?: string;
    public updated_at?: string;


    constructor(data?: Partial<GPS>) {
        Object.assign(this, data);
    }
}