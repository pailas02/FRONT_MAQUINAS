// src/app/services/departamento/departamentos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Departamento } from 'src/app/models/departamento.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  // Según tu imagen de Postman, el endpoint es http://127.0.0.1:3333/departamentos
  private apiUrl = 'http://127.0.0.1:3333/departamentos'; 

  constructor(private http: HttpClient) { }

  list(): Observable<Departamento[]> {
    // La imagen de Postman muestra que la respuesta GET /departamentos tiene una estructura { "data": [...] }
    // Por lo tanto, necesitamos mapear la respuesta para extraer el array 'data'
    return this.http.get<{ data: Departamento[] }>(this.apiUrl).pipe(
      // Utilizamos map de rxjs para transformar la respuesta del observable
      // Si tu backend no devuelve un objeto con 'data', simplemente usa .get<Departamento[]>(this.apiUrl)
      map(response => response.data)
    );
  }

  // Si necesitas operaciones de ver, crear, actualizar o eliminar para Departamento, agrégalas aquí:
  view(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }

  create(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  update(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${departamento.id}`, departamento);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}