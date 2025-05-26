// src/app/services/obraMunicipio/obra-municipio.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObrasMunicipio } from 'src/app/models/obras-municipio.model';

@Injectable({
  providedIn: 'root'
})
export class ObrasMunicipioService {

  private baseUrl = 'http://localhost:3333/obras_municipios';

  constructor(private http: HttpClient) {}

  list(): Observable<ObrasMunicipio[]> {
    return this.http.get<ObrasMunicipio[]>(this.baseUrl);
  }

  create(data: Partial<ObrasMunicipio>): Observable<ObrasMunicipio> {
    return this.http.post<ObrasMunicipio>(this.baseUrl, data);
  }

  update(id: number, data: Partial<ObrasMunicipio>): Observable<ObrasMunicipio> {
    return this.http.put<ObrasMunicipio>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getById(id: number): Observable<ObrasMunicipio> {
    return this.http.get<ObrasMunicipio>(`${this.baseUrl}/${id}`);
  }
}
