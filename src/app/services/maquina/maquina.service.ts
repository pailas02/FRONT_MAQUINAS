import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Maquina } from '../../models/maquina.model'; // Importando el modelo Maquina

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  private apiUrl = `${environment.url_ms_negocio}/maquinas`; // Ajusta esta URL si es diferente

  constructor(private http: HttpClient) {}

  // ✅ Obtener todas las máquinas (para selects o listas simples)
  getAll(): Observable<Maquina[]> {
    return this.http.get<{ data: Maquina[] }>(this.apiUrl).pipe(
      map(response => response.data) // Si tu API responde con { data: [...] }
    );
  }

  // ✅ Listado completo (usado en list.component.ts por ejemplo)
  list(): Observable<Maquina[]> {
    return this.getAll(); // Puedes redirigir a getAll() si hacen lo mismo
  }

  // ✅ Obtener una máquina por ID
  view(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${environment.url_ms_negocio}/maquinas/${id}`);
  }

  // ✅ Crear nueva máquina
  create(newMaquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(`${environment.url_ms_negocio}/maquinas`, newMaquina);
  }

  // ✅ Actualizar una máquina existente
  update(maquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.apiUrl}/${maquina.id}`, maquina);
  }

  // ✅ Eliminar una máquina
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
