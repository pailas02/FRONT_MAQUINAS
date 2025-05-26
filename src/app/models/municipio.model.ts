// src/app/models/municipio.model.ts

import { Departamento } from './departamento.model';

export class Municipio {
    public id?: number;
    public nombre?: string;
    public departamento_id?: number; // Clave foránea

    // Si tu API retorna el objeto Departamento anidado en el Municipio (ideal para mostrar el nombre)
    public departamento?: Departamento; // <--- Añade esto si tu API lo provee

    public created_at?: string;
    public updated_at?: string;

    constructor(data?: Partial<Municipio>) {
        Object.assign(this, data);
    }
}