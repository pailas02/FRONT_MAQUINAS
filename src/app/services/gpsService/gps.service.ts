import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gps } from '../../models/gps.model';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(private http: HttpClient) { }

  list(): Observable<Gps[]> {
    return this.http.get<Gps[]>(`${environment.url_ms_negocio}/Gps`);
  }

  view(id: number): Observable<Gps> {
    return this.http.get<Gps>(`${environment.url_ms_negocio}/Gps/${id}`);
  }

  create(newGps: Gps): Observable<Gps> {
    return this.http.post<Gps>(`${environment.url_ms_negocio}/Gps`, newGps);
  }

  update(theGps: Gps): Observable<Gps> {
    return this.http.put<Gps>(`${environment.url_ms_negocio}/Gps/${theGps.id}`, theGps);
  }

  delete(id: number) {
    return this.http.delete<Gps>(`${environment.url_ms_negocio}/Gps/${id}`);
  }
}