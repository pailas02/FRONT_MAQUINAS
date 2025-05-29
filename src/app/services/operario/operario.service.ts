import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operario } from 'src/app/models/operario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OperarioService {
  private readonly baseUrl = 'http://127.0.0.1:3333/operarios';

  constructor(private http: HttpClient) {}

  list(): Observable<Operario[]> {
    return this.http.get<Operario[]>(this.baseUrl);
  }

  view(id: number): Observable<Operario> {
    return this.http.get<Operario>(`${this.baseUrl}/${id}`);
  }

  create(operario: Operario): Observable<Operario> {
    return this.http.post<Operario>(`${this.baseUrl}/crear`, operario);
  }

  update(operario: Operario): Observable<Operario> {
    return this.http.put<Operario>(`${this.baseUrl}/${operario.id}`, operario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
