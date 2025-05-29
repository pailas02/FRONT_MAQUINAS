export class Evidencia {
  id?: number;
  tipo_de_archivo: string = '';
  contenido_archivo: string = ''; // debe ser base64
  fecha_de_carga: string = '';
  id_servicio: number = 0;
  novedad_id: number = 0;
  created_at?: string;
  updated_at?: string;
}
