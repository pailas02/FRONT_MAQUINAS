import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidad } from '../../models/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  constructor(private http: HttpClient) { }

  list(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${environment.url_ms_negocio}/especialidades`);
  }

  view(id: number): Observable<Especialidad> {
    return this.http.get<Especialidad>(`${environment.url_ms_negocio}/especialidades/${id}`);
  }

  create(newEspecialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(`${environment.url_ms_negocio}/especialidades`, newEspecialidad);
  }

  update(theEspecialidad: Especialidad): Observable<Especialidad> {
    return this.http.put<Especialidad>(`${environment.url_ms_negocio}/especialidades/${theEspecialidad.id}`, theEspecialidad);
  }

  delete(id: number) {
    return this.http.delete<Especialidad>(`${environment.url_ms_negocio}/especialidades/${id}`);
  }
}
