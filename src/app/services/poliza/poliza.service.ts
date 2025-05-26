import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PolizaMaquina } from 'src/app/models/poliza.model';

@Injectable({ providedIn: 'root' })
export class PolizaMaquinaService {
  private baseUrl = 'http://127.0.0.1:3333/polizas';

  constructor(private http: HttpClient) {}

  list(): Observable<PolizaMaquina[]> {
    return this.http.get<PolizaMaquina[]>(this.baseUrl);
  }

  view(id: number): Observable<PolizaMaquina> {
    return this.http.get<PolizaMaquina>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<PolizaMaquina>): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(data: PolizaMaquina): Observable<any> {
    return this.http.put(`${this.baseUrl}/${data.id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
