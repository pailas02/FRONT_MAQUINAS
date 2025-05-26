// src/app/services/obra/obras.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from 'src/app/models/obra.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ObraService {
  private apiUrl = 'http://127.0.0.1:3333/obras'; // Endpoint para Obras

  constructor(private http: HttpClient) { }

  list(): Observable<Obra[]> {
    return this.http.get<Obra[]>(this.apiUrl);
  }

  view(id: number): Observable<Obra> {
    return this.http.get<Obra>(`${this.apiUrl}/${id}`);
  }

  create(obra: Obra): Observable<Obra> {
    return this.http.post<Obra>(this.apiUrl, obra);
  }

  update(obra: Obra): Observable<Obra> {
    return this.http.put<Obra>(`${this.apiUrl}/${obra.id}`, obra);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}