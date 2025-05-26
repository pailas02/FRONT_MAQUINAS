// src/app/services/maquina/maquinas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maquina } from 'src/app/models/maquina.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  private apiUrl = `${environment.url_ms_negocio}/maquinas`; // Ajusta la URL base si es diferente

  constructor(private http: HttpClient) { }

  list(): Observable<Maquina[]> {
    return this.http.get<{ data: Maquina[] }>(this.apiUrl).pipe(
      map(response => response.data) // Asumo que tu API devuelve { data: [...] }
    );
  }

  view(id: number): Observable<Maquina> {
    return this.http.get<Maquina>(`${this.apiUrl}/${id}`);
  }

  create(newMaquina: Maquina): Observable<Maquina> {
    return this.http.post<Maquina>(this.apiUrl, newMaquina);
  }

  update(theMaquina: Maquina): Observable<Maquina> {
    return this.http.put<Maquina>(`${this.apiUrl}/${theMaquina.id}`, theMaquina);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}