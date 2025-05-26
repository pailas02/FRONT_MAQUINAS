import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoServicio } from 'src/app/models/tipo-servicio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  private baseUrl = `${environment.url_ms_negocio}/tipos-servicio`;

  constructor(private http: HttpClient) {}

  list(): Observable<TipoServicio[]> {
    return this.http.get<TipoServicio[]>(this.baseUrl);
  }

  view(id: number): Observable<TipoServicio> {
    return this.http.get<TipoServicio>(`${this.baseUrl}/${id}`);
  }

  create(tipo: TipoServicio): Observable<TipoServicio> {
    return this.http.post<TipoServicio>(this.baseUrl, tipo);
  }

  update(tipo: TipoServicio): Observable<TipoServicio> {
    return this.http.put<TipoServicio>(`${this.baseUrl}/${tipo.id}`, tipo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
