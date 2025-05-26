// src/app/models/combo.model.ts
// Si Combo tiene una relación con Servicio, podrías necesitar importar el modelo Servicio aquí.
// import { Servicio } from './servicio.model';

export class Combo {
    public id?: number;
    public servicio_id?: number; // Clave foránea para la relación con Servicio
    public created_at?: string;
    public updated_at?: string;

    // Si tu API retorna el objeto Servicio anidado en el Combo, podrías añadir:
    // public servicio?: Servicio;

    constructor(data?: Partial<Combo>) {
        Object.assign(this, data);
    }
}