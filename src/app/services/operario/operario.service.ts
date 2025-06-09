import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Operario } from 'src/app/models/operario.model';
import { Observable, throwError } from 'rxjs';

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
    // Validaciones básicas
    if (!operario.name || operario.name.trim().length < 3) {
      return throwError(() => new Error('El nombre es obligatorio y debe tener al menos 3 caracteres.'));
    }
    if (!operario.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(operario.email)) {
      return throwError(() => new Error('El email es obligatorio y debe tener formato válido.'));
    }
    const experienciaNum = Number(operario.experiencia);
    if (isNaN(experienciaNum) || experienciaNum < 0) {
      return throwError(() => new Error('La experiencia es obligatoria y debe ser un número positivo.'));
    }
    return this.http.post<Operario>(`${this.baseUrl}`, operario);
  }

  update(operario: Operario): Observable<Operario> {
    return this.http.put<Operario>(`${this.baseUrl}/${operario.id}`, operario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
