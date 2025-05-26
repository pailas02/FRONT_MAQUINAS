import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EspecialidadMaquina } from '../../models/especialidad-maquina.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadMaquinaService {

  constructor(private http: HttpClient) { }

  list(): Observable<EspecialidadMaquina[]> {
    return this.http.get<EspecialidadMaquina[]>(`${environment.url_ms_negocio}/especialidad_maquinarias`);
  }

  view(id: number): Observable<EspecialidadMaquina> {
    return this.http.get<EspecialidadMaquina>(`${environment.url_ms_negocio}/especialidad_maquinarias/${id}`);
  }

  create(newEspecialidadMaquina: EspecialidadMaquina): Observable<EspecialidadMaquina> {
    return this.http.post<EspecialidadMaquina>(`${environment.url_ms_negocio}/especialidad_maquinarias`, newEspecialidadMaquina);
  }

  update(theEspecialidadMaquina: EspecialidadMaquina): Observable<EspecialidadMaquina> {
    return this.http.put<EspecialidadMaquina>(`${environment.url_ms_negocio}/especialidad_maquinarias/${theEspecialidadMaquina.id}`, theEspecialidadMaquina);
  }

  delete(id: number) {
    return this.http.delete<EspecialidadMaquina>(`${environment.url_ms_negocio}/especialidad_maquinarias/${id}`);
  }
}