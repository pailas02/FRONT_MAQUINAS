export class Combo {
    public id?: number;
    public servicio_id?: number; // Clave foránea para la relación con Servicio
    public created_at?: string;
    public updated_at?: string;


    constructor(data?: Partial<Combo>) {
        Object.assign(this, data);
    }
}