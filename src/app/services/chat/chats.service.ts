import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Chat } from '../../models/chat.model';
@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  constructor(private http: HttpClient) {}

  list(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.url_ms_negocio}/chats`);
  }

  view(id: number): Observable<Chat> {
    return this.http.get<Chat>(`${environment.url_ms_negocio}/chats/${id}`);
  }

  create(newChat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${environment.url_ms_negocio}/chats`, newChat);
  }

  update(theChat: Chat): Observable<Chat> {
    return this.http.put<Chat>(`${environment.url_ms_negocio}/chats/${theChat.id}`, theChat);
  }

  delete(id: number) {
    return this.http.delete<Chat>(`${environment.url_ms_negocio}/chats/${id}`);
  }
}
