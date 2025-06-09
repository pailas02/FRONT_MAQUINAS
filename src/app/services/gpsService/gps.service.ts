import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GPS } from '../../models/gps.model';

@Injectable({
  providedIn: 'root'
})
export class GPSService {

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  list(): Observable<GPS[]> {
    return this.http.get<GPS[]>(`${environment.url_ms_negocio}/gps`, { headers: this.getAuthHeaders() });
  }

  view(id: number): Observable<GPS> {
    return this.http.get<GPS>(`${environment.url_ms_negocio}/gps/${id}`, { headers: this.getAuthHeaders() });
  }

  create(newGPS: GPS): Observable<GPS> {
    return this.http.post<GPS>(`${environment.url_ms_negocio}/gps`, newGPS, { headers: this.getAuthHeaders() });
  }

  update(theGPS: GPS): Observable<GPS> {
    return this.http.put<GPS>(`${environment.url_ms_negocio}/gps/${theGPS.id}`, theGPS, { headers: this.getAuthHeaders() });
  }

  delete(id: number) {
    return this.http.delete<GPS>(`${environment.url_ms_negocio}/gps/${id}`, { headers: this.getAuthHeaders() });
  }
}