import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SecurityService } from 'src/app/services/security/security.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Modelo del usuario (email y contraseña)
  user: User;

  constructor(
    private securityService: SecurityService, // Servicio para lógica de autenticación
    private router: Router,                   // Para navegación en Angular
    private ngZone: NgZone                    // Para ejecutar código dentro de la zona de Angular y asegurar la detección de cambios
  ) {
    // Inicializamos el modelo del usuario vacío al construir el componente
    this.user = { email: '', password: '' };
  }

  /**
   * ngOnInit se ejecuta una vez después de la inicialización de las propiedades del componente
   * y antes de que la vista se haya renderizado.
   */
  ngOnInit() {
    // Si necesitas alguna inicialización que no dependa del DOM, va aquí.
  }

  /**
   * Método para iniciar sesión.
   * Valida la presencia del token de reCAPTCHA y luego llama al servicio de seguridad.
   */
  login() {
    // Paso 1: Validar si el reCAPTCHA fue resuelto
    // Paso 2: Preparar los datos de inicio de sesión incluyendo el token de reCAPTCHA
    const loginData = {
      ...this.user // Desestructura el email y password del objeto user
    };

    // Paso 3: Llamar al servicio de seguridad para intentar el login
    this.securityService.login(loginData).subscribe({
      next: (data) => {
        // Paso 4: Manejar la respuesta del servicio
        if (data.requires2FA) {
          // Si el servidor indica que se requiere autenticación de dos factores (2FA)
          this.solicitarCodigo2FA(data.user._id);
        } else {
          // Si no se requiere 2FA, el login fue exitoso. Guarda la sesión y redirige.
          this.securityService.saveSession(data);
          this.router.navigate(['dashboard']); // Redirige al dashboard
        }
      },
      error: (err) => {
        // Paso 5: Manejar errores de autenticación
        let errorMessage = 'Usuario o contraseña inválido.';
        // Intenta obtener un mensaje de error más específico del backend si está disponible
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        Swal.fire('Autenticación Fallida', errorMessage, 'error');
      }
    });
  }

  /**
   * Muestra una ventana de SweetAlert2 para solicitar el código de autenticación de dos factores (2FA).
   * Permite múltiples intentos y maneja el bloqueo de la cuenta.
   * @param userId El ID del usuario que requiere 2FA.
   * @param intentos El número de intento actual (por defecto 1).
   */
  private solicitarCodigo2FA(userId: string, intentos = 1) {
    Swal.fire({
      title: `Segundo Factor (Intento ${intentos}/3)`,
      text: 'Ingresa el código de autenticación enviado a tu dispositivo.',
      input: 'text',
      inputPlaceholder: 'Código 2FA',
      showCancelButton: true,
      confirmButtonText: 'Validar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false, // Previene que el usuario cierre el modal haciendo clic fuera
      allowEscapeKey: false     // Previene que el usuario cierre el modal con la tecla ESC
    }).then(result => {
      // Verifica si el usuario confirmó y proporcionó un valor
      if (result.isConfirmed && result.value) {
        // Llama al servicio de seguridad para validar el código 2FA
        this.securityService.validate2FA(userId, result.value).subscribe({
          next: (data2FA) => {
            // Si el código 2FA es correcto, guarda la sesión y redirige
            this.securityService.saveSession(data2FA);
            this.router.navigate(['dashboard']);
          },
          error: (err) => {
            // Manejo de errores al validar el 2FA
            const msg = err?.error?.message || 'Error al validar el código 2FA.';
            if (msg === 'Número máximo de intentos alcanzado') {
              Swal.fire('Bloqueado', 'Has superado el número máximo de intentos. Tu cuenta podría estar bloqueada temporalmente.', 'error');
            } else if (intentos < 3) {
              // Si aún quedan intentos, notifica y permite un nuevo intento
              Swal.fire('Código incorrecto', 'El código ingresado no es válido. Intenta nuevamente.', 'warning').then(() => {
                this.solicitarCodigo2FA(userId, intentos + 1); // Llama recursivamente para un nuevo intento
              });
            } else {
              // Si se superaron los intentos máximos o un error genérico
              Swal.fire('Error de Validación', 'Se alcanzó el máximo de intentos o un error inesperado ocurrió.', 'error');
            }
          }
        });
      }
    });
  }
}