import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mantenimiento } from '../../models/mantenimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http: HttpClient) { }

  list(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(`${environment.url_ms_negocio}/mantenimientos`);
  }

  view(id: number): Observable<Mantenimiento> {
    return this.http.get<Mantenimiento>(`${environment.url_ms_negocio}/mantenimientos/${id}`);
  }

  create(newMantenimiento: Mantenimiento): Observable<Mantenimiento> {
    return this.http.post<Mantenimiento>(`${environment.url_ms_negocio}/mantenimientos`, newMantenimiento);
  }

  update(theMantenimiento: Mantenimiento): Observable<Mantenimiento> {
    return this.http.put<Mantenimiento>(`${environment.url_ms_negocio}/mantenimientos/${theMantenimiento.id}`, theMantenimiento);
  }

  delete(id: number) {
    return this.http.delete<Mantenimiento>(`${environment.url_ms_negocio}/mantenimientos/${id}`);
  }
}