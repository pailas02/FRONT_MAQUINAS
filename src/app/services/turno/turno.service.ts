import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Turno } from 'src/app/models/turno.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private baseUrl = 'http://127.0.0.1:3333/turnos';

  constructor(private http: HttpClient) {}

  list(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.baseUrl);
  }

  view(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.baseUrl}/${id}`);
  }

  create(turno: Partial<Turno>): Observable<any> {
    return this.http.post(this.baseUrl, turno);
  }

  update(turno: Turno): Observable<any> {
    return this.http.put(`${this.baseUrl}/${turno.id}`, turno);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
