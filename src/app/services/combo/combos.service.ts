// src/app/services/combo/combo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from 'src/app/models/combo.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  private apiUrl = 'http://127.0.0.1:3333/combos'; // Ajusta esta URL a tu endpoint de combos

  constructor(private http: HttpClient) { }

  list(): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.apiUrl);
  }

  view(id: number): Observable<Combo> {
    return this.http.get<Combo>(`${this.apiUrl}/${id}`);
  }

  create(combo: Combo): Observable<Combo> {
    return this.http.post<Combo>(this.apiUrl, combo);
  }

  update(combo: Combo): Observable<Combo> {
    return this.http.put<Combo>(`${this.apiUrl}/${combo.id}`, combo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}