import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly baseUrl = 'http://127.0.0.1:3333/operarios';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  view(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl + '/crear', usuario, { headers: this.getAuthHeaders() });
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario, { headers: this.getAuthHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
