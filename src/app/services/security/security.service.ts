// src/app/services/security/security.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { LoginRequest } from '../../models/login-request';
import { RegisterRequest } from '../../models/register-request.model';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc'; // <-- NUEVO: Importar OAuthService
import { authConfig } from 'src/app/app.module'; // <-- NUEVO: Importar la configuración de OAuth
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private userSubject = new BehaviorSubject<User>(new User());

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService // <-- NUEVO: Inyectar OAuthService
  ) {
    this.loadStoredSession();
    this.configureGoogleOAuth(); // <-- NUEVO: Configurar Google OAuth al inicio
  }

  // --- NUEVO: Métodos para Google OAuth ---
  private configureGoogleOAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    // Carga el documento de descubrimiento y intenta iniciar sesión si ya hay un token en la URL
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken()) {
        const claims = this.oauthService.getIdentityClaims();
        console.log('Usuario de Google autenticado:', claims);
        // Aquí puedes enviar el token de Google a tu backend para validarlo y crear una sesión
        // O simplemente guardar la sesión en el frontend si es suficiente.
        this.processGoogleLogin(claims, this.oauthService.getAccessToken());
      }
    });

    // Opcional: Escuchar eventos de OAuth para depuración
    this.oauthService.events.subscribe(e => {
      console.log('OAuth Event:', e);
    });
  }

  public googleLogin(): void {
    this.oauthService.initImplicitFlow(); // Inicia el flujo de autenticación de Google
  }

  public hasGoogleValidAccessToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public getGoogleUserProfile(): any {
    return this.oauthService.getIdentityClaims();
  }

  public getGoogleAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  // Método para procesar el login de Google después de obtener los tokens
  // Puedes adaptarlo para enviar el token a tu backend si lo necesitas
  private processGoogleLogin(claims: any, accessToken: string): void {
    const sessionUser: User = {
      _id: claims.sub, // 'sub' es el ID único del usuario de Google
      name: claims.name,
      email: claims.email,
      password: '', // No aplicable aquí
      token: accessToken, // Usamos el access token de Google como token de sesión temporal
      role: { _id: 'guest', name: 'guest' } // Puedes asignar un rol por defecto o obtenerlo del backend
    };
    // NOTA: Si tu backend necesita validar este token y generar uno propio (JWT),
    // deberías enviar `accessToken` a un endpoint de tu backend, y luego recibir el JWT de tu backend
    // para guardarlo con `saveSession`.
    // Ejemplo:
     this.http.post(`${environment.url_ms_security}/api/auth/google`, { accessToken }).subscribe(
       backendResponse => {
         this.saveSession(backendResponse); // Guarda la sesión generada por tu backend
         console.log('Login Google procesado por backend');
       },
       error => {
         console.error('Error al procesar login de Google en el backend:', error);
         Swal.fire('Error de Login', 'No se pudo completar el login con Google.', 'error');
       }
     );
    // Si no tienes un endpoint de backend para procesar el token de Google y solo usas el token de Google en el frontend:
    // this.saveSession(sessionUser); // Guardar la sesión de Google directamente
  }

  // --- Métodos existentes ---

  /** Enviar login con reCAPTCHA */
  login(loginData: LoginRequest): Observable<any> { // Corregí el tipo de loginData
    return this.http.post(`${environment.url_ms_security}/api/public/security/login`, loginData);
  }

  /** Validar segundo factor */
  validate2FA(userId: string, code: string): Observable<any> {
    return this.http.post(`${environment.url_ms_security}/api/public/security/login/2FA/${userId}`, { code2FA: code });
  }

  /**
   * Método para registrar un nuevo usuario.
   */
  register(registerData: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.url_ms_security}/api/users`, registerData);
  }

  /** Guardar sesión y emitir usuario */
  saveSession(data: any) {
    const sessionUser: User = {
      _id: data._id || data.user?._id, // Adaptado para Google claims o tu login estándar
      name: data.name || data.user?.name,
      email: data.email || data.user?.email,
      password: '', // No guardar la contraseña en la sesión
      token: data.token,
      role: data.role || data.user?.role // Adaptado para Google claims o tu login estándar
    };
    localStorage.setItem('sesion', JSON.stringify(sessionUser));
    localStorage.setItem('token', data.token); // Almacena el token del backend o de Google
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
    localStorage.removeItem('token');
    localStorage.removeItem('sesion');
    this.userSubject.next(new User());
    this.oauthService.logOut(); // <-- NUEVO: Cerrar sesión de Google también
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