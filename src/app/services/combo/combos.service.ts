import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from 'src/app/models/combo.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComboService {
  private apiUrl = `${environment.url_ms_negocio}/combos`;

  constructor(private http: HttpClient) { }

  list(): Observable<Combo[]> {
    return this.http.get<Combo[]>(this.apiUrl);
  }

  view(id: number): Observable<Combo> {
    return this.http.get<Combo>(`${this.apiUrl}/${id}`);
  }

  create(newCombo: Combo): Observable<Combo> {
    return this.http.post<Combo>(this.apiUrl, newCombo);
  }

  update(theCombo: Combo): Observable<Combo> {
    return this.http.put<Combo>(`${this.apiUrl}/${theCombo.id}`, theCombo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}