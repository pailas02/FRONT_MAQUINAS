// src/app/services/gps/gps.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GPS } from 'src/app/models/gps.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GPSService {
  private apiUrl = `${environment.url_ms_negocio}/gps`; // Ajusta la URL base si es diferente

  constructor(private http: HttpClient) { }

  list(): Observable<GPS[]> {
    return this.http.get<{ data: GPS[] }>(this.apiUrl).pipe(
      map(response => response.data) // Asumo que tu API devuelve { data: [...] }
    );
  }

  view(id: number): Observable<GPS> {
    return this.http.get<GPS>(`${this.apiUrl}/${id}`);
  }

  create(newGPS: GPS): Observable<GPS> {
    return this.http.post<GPS>(this.apiUrl, newGPS);
  }

  update(theGPS: GPS): Observable<GPS> {
    return this.http.put<GPS>(`${this.apiUrl}/${theGPS.id}`, theGPS);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}