import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuotas} from '../../models/cuota.model';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {

  constructor(private http: HttpClient) { }

  list(): Observable<Cuotas[]> {
    return this.http.get<Cuotas[]>(`${environment.url_ms_negocio}/cuotas`);
  }

  view(id: number): Observable<Cuotas> {
    return this.http.get<Cuotas>(`${environment.url_ms_negocio}/cuotas/${id}`);
  }

  create(newQuota: Cuotas): Observable<Cuotas> {
    return this.http.post<Cuotas>(`${environment.url_ms_negocio}/cuotas`, newQuota);
  }

  update(theQuota: Cuotas): Observable<Cuotas> {
    return this.http.put<Cuotas>(`${environment.url_ms_negocio}/cuotas/${theQuota.id}`, theQuota);
  }

  delete(id: number) {
    return this.http.delete<Cuotas>(`${environment.url_ms_negocio}/cuotas/${id}`);
  }

  pay(paymentData: any): Observable<any> {
    const url = `${environment.url_ms_negocio}/cuotas/${paymentData.due.id}/pay`;
    console.log('URL:', url);
    console.log('Datos enviados:', paymentData);
    return this.http.post<any>(url, paymentData);
  }
}