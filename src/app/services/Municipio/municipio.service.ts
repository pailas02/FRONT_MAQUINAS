// src/app/services/municipio/municipios.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Municipio } from '../../models/municipio.model'; // Importando el modelo Municipio
import { map } from 'rxjs/operators'; // ¡Importa el operador map!

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private http: HttpClient) { }

  list(): Observable<Municipio[]> {
    // Si la respuesta de tu API es { "data": [...] }
    return this.http.get<{ data: Municipio[] }>(`${environment.url_ms_negocio}/municipios`).pipe(
      map(response => response.data) // Extrae el array 'data' de la respuesta
    );
    // Si tu API devuelve directamente el array, usa solo:
    // return this.http.get<Municipio[]>(`${environment.url_ms_negocio}/municipios`);
  }

  // ... (el resto de tus métodos view, create, update, delete son correctos)
  view(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${environment.url_ms_negocio}/municipios/${id}`);
  }

  create(newMunicipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(`${environment.url_ms_negocio}/municipios`, newMunicipio);
  }

  update(theMunicipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${environment.url_ms_negocio}/municipios/${theMunicipio.id}`, theMunicipio);
  }

  delete(id: number) {
    return this.http.delete<Municipio>(`${environment.url_ms_negocio}/municipios/${id}`);
  }

}


