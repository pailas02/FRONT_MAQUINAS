import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Novedad } from 'src/app/models/novedad.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NovedadService {
  private baseUrl = 'http://127.0.0.1:3333/novedades';

  constructor(private http: HttpClient) {}

  list(): Observable<Novedad[]> {
    return this.http.get<Novedad[]>(this.baseUrl);
  }

  view(id: number): Observable<Novedad> {
    return this.http.get<Novedad>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Novedad>): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(data: Novedad): Observable<any> {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
