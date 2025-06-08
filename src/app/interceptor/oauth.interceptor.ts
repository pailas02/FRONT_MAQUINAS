import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError para manejo de errores
import { catchError } from 'rxjs/operators'; // Importa catchError desde 'rxjs/operators'

import { SecurityService } from '../services/security/security.service';
import { Router } from '@angular/router'; // Importa Router
import Swal from 'sweetalert2'; // Asumo que usas SweetAlert2, si no, actualiza o remueve
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  /**
   * Intercepta solicitudes HTTP:
   * - No agrega token a rutas públicas.
   * - Agrega token Bearer a rutas protegidas.
   * - Muestra alertas y redirige ante errores como 401 o 500.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userSession = this.securityService.activeUserSession;
    const token = userSession?.token || null;

    const publicRoutes = ['/login', '/token-validation'];
    const isPublicRoute = publicRoutes.some(route => request.url.includes(route));
    const isOauthSuccess = request.url.includes('/auth/oauth-success');

    if (isPublicRoute || isOauthSuccess) {
      if (!environment.production) {
        console.log("🔓 Ruta pública u OauthSuccess detectada, no se adjunta token:", request.url);
      }
      return next.handle(request);
    }

    if (!token) {
      if (!environment.production) {
        console.warn("⚠️ No se encontró token para la solicitud:", request.url);
      }
      return next.handle(request);
    }

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (environment) {
      console.log("✅ Token adjuntado a la solicitud:", request.url);
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (environment) {
          console.error('❌ Error en la solicitud HTTP:', error);
        }

        if (error.status === 401) {
          Swal.fire({
            title: 'No está autorizado o su sesión ha expirado.',
            icon: 'error',
            timer: 5000
          });
          this.router.navigateByUrl('/login');
        } else if (error.status === 400) {
          Swal.fire({
            title: 'Error en la solicitud. Contacte al administrador.',
            icon: 'error',
            timer: 5000
          });
        } else if (error.status >= 500) {
          Swal.fire({
            title: 'Error interno del servidor.',
            icon: 'error',
            timer: 5000
          });
        } else {
          Swal.fire({
            title: 'Ha ocurrido un error inesperado.',
            icon: 'error',
            timer: 5000
          });
        }

        return throwError(() => error);
      })
    );
  }
}
