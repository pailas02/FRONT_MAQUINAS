import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno } from 'src/app/models/turno.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private baseUrl = 'http://127.0.0.1:3333/turnos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  list(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  view(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(turno: Partial<Turno>): Observable<any> {
    return this.http.post(this.baseUrl, turno, { headers: this.getAuthHeaders() });
  }

  update(turno: Turno): Observable<any> {
    return this.http.put(`${this.baseUrl}/${turno.id}`, turno, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
