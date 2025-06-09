import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoServicio } from '../models/tipo-servicio.model';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  list(): Observable<TipoServicio[]> {
    return this.http.get<TipoServicio[]>(`${environment.url_ms_negocio}/tipo_servicios`, { headers: this.getAuthHeaders() });
  }

  view(id: number): Observable<TipoServicio> {
    return this.http.get<TipoServicio>(`${environment.url_ms_negocio}/tipo_servicios/${id}`, { headers: this.getAuthHeaders() });
  }

  create(newTipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.post<TipoServicio>(`${environment.url_ms_negocio}/tipo_servicios`, newTipoServicio, { headers: this.getAuthHeaders() });
  }

  update(theTipoServicio: TipoServicio): Observable<TipoServicio> {
    return this.http.put<TipoServicio>(`${environment.url_ms_negocio}/tipo_servicios/${theTipoServicio.id}`, theTipoServicio, { headers: this.getAuthHeaders() });
  }

  delete(id: number) {
    return this.http.delete<TipoServicio>(`${environment.url_ms_negocio}/tipo_servicios/${id}`, { headers: this.getAuthHeaders() });
  }
}