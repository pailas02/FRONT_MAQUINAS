import { Combo } from "./combo.model";

export class Servicio {
    public id?: number;
    public costo?: number;
    public prioridad?: string; // Corregido: Es un STRING ("Alta", "Media", "Baja")
    public tipo?: string; // Corregido: El campo se llama "tipo" en el JSON, no "tipoServicio"
    public f_inicio?: string; // Mantener como STRING para mapeo directo del JSON (ej. "2024-05-01T...")
    public f_fin?: string | null; // Mantener como STRING o null (si puede ser nulo)
    public estado?: string;
    public ubicacion?: string;
    public resumen?: string; // Añadido: Campo "resumen" del JSON
    public created_at?: string; // Añadido: Campo "created_at" del JSON
    public updated_at?: string; // Añadido: Campo "updated_at" del JSON

    // Campos que no están en tu JSON de ejemplo pero sí en tu modelo original:
     historico?: string; // Si este campo no viene del API en esta petición, puedes eliminarlo o mantenerlo como opcional.
    // comboId?: Combo; // Si es una relación, dependerá de cómo tu API la envíe.
    // combos?: Combo[]; // Si son múltiples combos, dependerá de cómo tu API los envíe.

    // Constructor opcional para facilitar la creación de instancias
    constructor(data?: Partial<Servicio>) {
        Object.assign(this, data);
    }
}