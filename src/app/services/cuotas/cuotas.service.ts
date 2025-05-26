import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuota } from '../../models/cuota.model';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(`${environment.url_ms_negocio}/Cuota`);
  }

  view(id: number): Observable<Cuota> {
    return this.http.get<Cuota>(`${environment.url_ms_negocio}/Cuota/${id}`);
  }

  create(newQuota: Cuota): Observable<Cuota> {
    return this.http.post<Cuota>(`${environment.url_ms_negocio}/Cuota`, newQuota);
  }

  update(theQuota: Cuota): Observable<Cuota> {
    return this.http.put<Cuota>(`${environment.url_ms_negocio}/Cuota/${theQuota.id}`, theQuota);
  }

  delete(id: number) {
    return this.http.delete<Cuota>(`${environment.url_ms_negocio}/Cuota/${id}`);
  }
}