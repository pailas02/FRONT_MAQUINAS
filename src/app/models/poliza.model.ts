// poliza.model.ts
export interface PolizaMaquina {
  id?: number;
  seguro_id: number;
  maquina_id?: number | null; 
  operario_id?: number | null;
  tipo_poliza: string;
  fechaInicio?: string; // usado en el formulario
  fechaFin?: string;    // usado en el formulario
  fecha_inicio?: string; // usado en el backend
  fecha_fin?: string;    // usado en el backend
}
