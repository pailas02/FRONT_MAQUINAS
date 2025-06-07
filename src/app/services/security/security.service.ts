import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { LoginRequest } from '../../models/login-request';
import { RegisterRequest } from '../../models/register-request.model'; // Importa la interfaz de registro

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private userSubject = new BehaviorSubject<User>(new User());

  constructor(private http: HttpClient) {
    this.loadStoredSession();
  }

  /** Enviar login con reCAPTCHA */
  login(loginData: any): Observable<any> {
    return this.http.post(`${environment.url_ms_security}/api/public/security/login`, loginData);
  }

  /** Validar segundo factor */
  validate2FA(userId: string, code: string): Observable<any> {
    return this.http.post(`${environment.url_ms_security}/api/public/security/login/2FA/${userId}`, { code2FA: code });
  }

  /**
   * Método para registrar un nuevo usuario.
   * Asume que la URL para el registro es `${environment.url_ms_security}/api/users`
   * Basado en la imagen de Postman: http://localhost:8081/api/users
   */
  register(registerData: RegisterRequest): Observable<any> {
    // Si tu `environment.url_ms_security` ya apunta a http://localhost:8081, entonces solo necesitas '/api/users'
    // De lo contrario, ajusta la URL base según tu configuración real.
    return this.http.post(`${environment.url_ms_security}/api/users`, registerData);
  }

  /** Guardar sesión y emitir usuario */
  saveSession(data: any) {
    const sessionUser: User = {
      _id: data.user._id,
      name: data.user.name,
      email: data.user.email,
      password: '', // No guardar la contraseña en la sesión
      token: data.token,
      role: data.user.role
    };
    localStorage.setItem('sesion', JSON.stringify(sessionUser));
    this.userSubject.next(sessionUser);
  }

  /** Obtener observable de usuario */
  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  /** Obtener usuario actual */
  get activeUserSession(): User {
    return this.userSubject.value;
  }

  /** Cerrar sesión */
  logout() {
    localStorage.removeItem('sesion');
    this.userSubject.next(new User());
  }

  /** Cargar sesión desde almacenamiento local */
  private loadStoredSession() {
    const stored = localStorage.getItem('sesion');
    if (stored) {
      this.userSubject.next(JSON.parse(stored));
    }
  }

  /** Verificar si hay sesión */
  existSession(): boolean {
    return !!localStorage.getItem('sesion');
  }

  /** Solicitar código de restablecimiento */
  requestResetPassword(userId: string): Observable<any> {
    return this.http.post(`${environment.url_ms_security}/resetpassword/request/${userId}`, {});
  }

  /** Validar código y nueva contraseña */
  verifyResetCode(data: { userId: string; code: string; newPassword: string }): Observable<any> {
    return this.http.post(`${environment.url_ms_security}/resetpassword/confirm`, data);
  }
}