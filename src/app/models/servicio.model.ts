// src/app/models/servicio.model.ts

export class Servicio {
    public id?: number;
    public nombre?: string; // Asegúrate de que esta propiedad ya esté aquí
    public f_inicio?: string; // <-- Añade esta propiedad
    public f_fin?: string;    // <-- Añade esta propiedad
    public historico?: string; // <-- Añade esta propiedad (o el tipo correcto si es boolean, number, etc.)

    public created_at?: string;
    public updated_at?: string;

    constructor(data?: Partial<Servicio>) {
        Object.assign(this, data);
    }
}