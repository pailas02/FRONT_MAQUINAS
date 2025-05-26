import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Turno } from '../../models/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${environment.url_ms_negocio}/turnos`);
  }

  view(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${environment.url_ms_negocio}/turnos/${id}`);
  }

  create(newTurno: Turno): Observable<Turno> {
    return this.http.post<Turno>(`${environment.url_ms_negocio}/turnos`, newTurno);
  }

  update(theTurno: Turno): Observable<Turno> {
    return this.http.put<Turno>(`${environment.url_ms_negocio}/turnos/${theTurno.id}`, theTurno);
  }

  delete(id: number) {
    return this.http.delete<Turno>(`${environment.url_ms_negocio}/turnos/${id}`);
  }
}