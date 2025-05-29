import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GPS } from '../../models/gps.model';

@Injectable({
  providedIn: 'root'
})
export class GPSService {

  constructor(private http: HttpClient) { }

  list(): Observable<GPS[]> {
    return this.http.get<GPS[]>(`${environment.url_ms_negocio}/gps`);
  }

  view(id: number): Observable<GPS> {
    return this.http.get<GPS>(`${environment.url_ms_negocio}/gps/${id}`);
  }

  create(newGPS: GPS): Observable<GPS> {
    return this.http.post<GPS>(`${environment.url_ms_negocio}/gps`, newGPS);
  }

  update(theGPS: GPS): Observable<GPS> {
    return this.http.put<GPS>(`${environment.url_ms_negocio}/gps/${theGPS.id}`, theGPS);
  }

  delete(id: number) {
    return this.http.delete<GPS>(`${environment.url_ms_negocio}/gps/${id}`);
  }
}