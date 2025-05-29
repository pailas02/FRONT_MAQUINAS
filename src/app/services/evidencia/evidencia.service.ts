import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evidencia } from 'src/app/models/evidencia.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvidenciaService {
  private readonly baseUrl = 'http://127.0.0.1:3333/evidencias';

  constructor(private http: HttpClient) {}

  list(): Observable<Evidencia[]> {
    return this.http.get<Evidencia[]>(this.baseUrl);
  }

  view(id: number): Observable<Evidencia> {
    return this.http.get<Evidencia>(`${this.baseUrl}/${id}`);
  }

  create(evidencia: Evidencia): Observable<Evidencia> {
    return this.http.post<Evidencia>(this.baseUrl, evidencia);
  }

  update(evidencia: Evidencia): Observable<Evidencia> {
    return this.http.put<Evidencia>(`${this.baseUrl}/${evidencia.id}`, evidencia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
