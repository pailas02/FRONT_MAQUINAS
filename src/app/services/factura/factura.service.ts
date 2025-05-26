import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${environment.url_ms_negocio}/facturas`);
  }

  view(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${environment.url_ms_negocio}/facturas/${id}`);
  }

  create(newBill: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${environment.url_ms_negocio}/facturas`, newBill);
  }

  update(theBill: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${environment.url_ms_negocio}/facturas/${theBill.id}`, theBill);
  }

  delete(id: number) {
    return this.http.delete<Factura>(`${environment.url_ms_negocio}/facturas/${id}`);
  }
}