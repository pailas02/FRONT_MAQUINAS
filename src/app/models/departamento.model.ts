// src/app/models/departamento.model.ts

export class Departamento {
    public id?: number;
    public nombre?: string;
    // Agrega aquí cualquier otra propiedad que tu API retorne para un departamento
    // public created_at?: string;
    // public updated_at?: string;

    constructor(data?: Partial<Departamento>) {
        Object.assign(this, data);
    }
}