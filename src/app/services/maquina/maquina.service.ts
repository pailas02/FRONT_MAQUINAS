import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maquina } from '../../models/maquina.model';

@Injectable({
  providedIn: 'root'
})        
export class MaquinaService {
  private apiUrl = `${environment.url_ms_negocio}/maquinas`; // Ajusta esta URL si es diferente

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // ✅ Obtener todas las máquinas (para selects o listas simples)
  getAll(): Observable<Maquina[]> {
    return this.http.get<{ data: Maquina[] }>(this.apiUrl).pipe(
      map(response => response.data) // Si tu API responde con { data: [...] }
    );
  }

  // ✅ Listado completo (usado en list.component.ts por ejemplo)
  list(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // ✅ Obtener una máquina por ID
  view(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // ✅ Crear nueva máquina
  create(newMaquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(this.apiUrl, newMaquina, { headers: this.getAuthHeaders() });
  }

  // ✅ Actualizar una máquina existente
  update(maquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.apiUrl}/${maquina.id}`, maquina, { headers: this.getAuthHeaders() });
  }

  // ✅ Eliminar una máquina
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
