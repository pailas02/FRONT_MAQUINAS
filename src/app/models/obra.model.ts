// src/app/models/obra.model.ts
import { Combo } from './combo.model'; // Si necesitas el objeto Combo completo, si no, solo el ID

export class Obra {
    public id?: number;
    public nombre?: string;
    public combo_id?: number; // Clave foránea para la relación con Combo
    public created_at?: string;
    public updated_at?: string;

    // Si tu API retorna el objeto Combo anidado en la Obra, podrías añadir:
    // public combo?: Combo;

    constructor(data?: Partial<Obra>) {
        Object.assign(this, data);
    }
}