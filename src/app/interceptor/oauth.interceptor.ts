import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse // Importa HttpErrorResponse para tipado correcto
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Importa throwError para manejo de errores
import { catchError } from 'rxjs/operators'; // Importa catchError desde 'rxjs/operators'

import { SecurityService } from '../services/security.service'; // Asegúrate de actualizar esta ruta
import { Router } from '@angular/router'; // Importa Router
import Swal from 'sweetalert2'; // Asumo que usas SweetAlert2, si no, actualiza o remueve

@Injectable({
  providedIn: 'root' // Es buena práctica proporcionar el interceptor en 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  // Inyecta SecurityService y Router
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  /**
   * Intercepta las solicitudes HTTP para añadir el token de autenticación
   * y manejar errores comunes.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userSession = this.securityService.activeUserSession;
    const token = userSession ? userSession.token : null; // Acceso seguro al token

    // Define las rutas que no necesitan token
    const publicRoutes = ['/login', '/token-validation'];
    const isPublicRoute = publicRoutes.some(route => request.url.includes(route));

    // Si la solicitud es para una ruta pública, no adjuntes el token
    if (isPublicRoute) {
      console.log("No se adjunta token para ruta pública:", request.url);
      return next.handle(request); // Continúa sin modificar la solicitud
    }

    // Si no hay token en la sesión, también continúa sin añadirlo (o puedes manejarlo como un error de sesión)
    if (!token) {
      console.warn("No hay token disponible para la solicitud:", request.url);
      // Opcional: podrías redirigir al login aquí si la ruta no es pública y no hay token.
      // this.router.navigateByUrl('/login');
      return next.handle(request);
    }

    // Adjunta el token a la solicitud
    console.log("Adjuntando token a la solicitud:", request.url);
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Continúa con la solicitud modificada y maneja los errores
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP:', error); // Log del error para depuración

        // Manejo de errores específicos
        if (error.status === 401) {
          // Error de no autorizado
          Swal.fire({
            title: 'No está autorizado para esta operación o su sesión ha expirado.',
            icon: 'error',
            timer: 5000
          });
          // Redirige al login o al dashboard si la sesión es inválida
          this.router.navigateByUrl('/login'); // O '/dashboard' si prefieres
        } else if (error.status === 400) {
          // Error de solicitud incorrecta (Bad Request)
          Swal.fire({
            title: 'Existe un error en la solicitud, contacte al administrador.',
            icon: 'error',
            timer: 5000
          });
        } else if (error.status >= 500) {
          // Errores del servidor (5xx)
          Swal.fire({
            title: 'Error interno del servidor. Intente de nuevo más tarde.',
            icon: 'error',
            timer: 5000
          });
        } else {
          // Otros errores no manejados específicamente
          Swal.fire({
            title: 'Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }

        // Propaga el error para que pueda ser manejado por otros suscriptores
        return throwError(() => error);
      })
    );
  }
}