import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operario } from '../../models/operario.model';

@Injectable({
  providedIn: 'root'
})
export class OperarioService {

  constructor(private http: HttpClient) { }

  list(): Observable<Operario[]> {
    return this.http.get<Operario[]>(`${environment.url_ms_negocio}/operarios`);
  }

  view(id: number): Observable<Operario> {
    return this.http.get<Operario>(`${environment.url_ms_negocio}/operarios/${id}`);
  }

  create(newOperario: Operario): Observable<Operario> {
    return this.http.post<Operario>(`${environment.url_ms_negocio}/operarios`, newOperario);
  }

  update(operario: Operario): Observable<Operario> {
    return this.http.put<Operario>(`${environment.url_ms_negocio}/operarios/${operario.id}`, operario);
  }

  delete(id: number) {
    return this.http.delete<Operario>(`${environment.url_ms_negocio}/operarios/${id}`);
  }
}