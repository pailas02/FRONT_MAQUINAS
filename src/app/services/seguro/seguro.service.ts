import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seguro } from '../../models/seguro.model';
import { Maquina } from '../../models/maquina.model';
import { Operario } from '../../models/operario.model';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  constructor(private http: HttpClient) {}

  list(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(`${environment.url_ms_negocio}/seguros`);
  }

  view(id: number): Observable<Seguro> {
    return this.http.get<Seguro>(`${environment.url_ms_negocio}/seguros/${id}`);
  }

  create(newSeguro: Seguro): Observable<Seguro> {
    return this.http.post<Seguro>(`${environment.url_ms_negocio}/seguros`, newSeguro);
  }

  update(theSeguro: Seguro): Observable<Seguro> {
    return this.http.put<Seguro>(`${environment.url_ms_negocio}/seguros/${theSeguro.id}`, theSeguro);
  }

  delete(id: number): Observable<Seguro> {
    return this.http.delete<Seguro>(`${environment.url_ms_negocio}/seguros/${id}`);
  }

  // ✅ Métodos requeridos por ManageComponent
  getMaquinas(): Observable<Maquina[]> {
    return this.http.get<Maquina[]>(`${environment.url_ms_negocio}/maquinas`);
  }
  getAll(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>('http://127.0.0.1:3333/seguros');
  }

  getOperarios(): Observable<Operario[]> {
    return this.http.get<Operario[]>(`${environment.url_ms_negocio}/operarios`);
  }
}
