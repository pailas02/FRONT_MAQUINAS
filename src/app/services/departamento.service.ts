// src/app/services/departamento/departamentos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://127.0.0.1:3333/departamentos'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  list(): Observable<Departamento[]> {
    return this.http.get<{ data: Departamento[] }>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(response => response.data)
    );
  }

  view(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento, { headers: this.getAuthHeaders() });
  }

  update(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${departamento.id}`, departamento, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}