// ✅ src/app/pages/login/login.component.ts
import { Component, OnInit, NgZone, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { SecurityService } from 'src/app/services/security/security.service';
import { LoginRequest } from 'src/app/models/login-request';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: LoginRequest = new LoginRequest();
  recaptchaToken: string = '';
  recaptchaWidgetId: any;
  isLoading: boolean = false;

  @ViewChild('recaptchaContainer') recaptchaContainer: ElementRef;

  constructor(
    private securityService: SecurityService,
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.securityService.existSession() || this.securityService.hasGoogleValidAccessToken()) {
      this.router.navigate(['dashboard']);
    }
  }

  ngAfterViewInit(): void {
    this.renderRecaptchaWidget();
  }

  private renderRecaptchaWidget(): void {
    if (window.hasOwnProperty('grecaptcha') && grecaptcha.render && this.recaptchaContainer) {
      this.recaptchaWidgetId = grecaptcha.render(this.recaptchaContainer.nativeElement, {
        sitekey: '6LdB9VQrAAAAALs9_mS_RQTv5rxJDq89Drmee44R',
        callback: (response: string) => {
          this.ngZone.run(() => {
            this.recaptchaToken = response;
            this.loginForm.captcha = response;
          });
        },
        'expired-callback': () => {
          this.ngZone.run(() => {
            this.recaptchaToken = '';
            this.loginForm.captcha = '';
            Swal.fire('reCAPTCHA Expirado', 'Por favor, verifica el reCAPTCHA nuevamente.', 'info');
          });
        }
      });
    } else {
      setTimeout(() => this.renderRecaptchaWidget(), 300);
    }
  }

  login(): void {
    if (!this.recaptchaToken) {
      Swal.fire('reCAPTCHA', 'Por favor, verifica el reCAPTCHA.', 'warning');
      return;
    }

    this.isLoading = true;
    this.securityService.login(this.loginForm).subscribe({
      next: (data) => {
        this.isLoading = false;
        if (data.user && data.user._id && !data.token) {
          this.solicitarCodigo2FA(data.user._id);
        } else if (data.token) {
          this.securityService.saveSession(data);
          this.router.navigate(['dashboard']);
        } else {
          Swal.fire('Error', 'Respuesta inesperada del servidor.', 'error');
        }
      },
      error: (err) => {
        this.isLoading = false;
        let errorMessage = 'Usuario o contraseña inválido.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        } else if (err.status === 401) {
          errorMessage = 'Credenciales incorrectas.';
        }
        Swal.fire('Autenticación Fallida', errorMessage, 'error');

        if (window.hasOwnProperty('grecaptcha') && this.recaptchaWidgetId !== undefined) {
          grecaptcha.reset(this.recaptchaWidgetId);
          this.recaptchaToken = '';
          this.loginForm.captcha = '';
        }
      }
    });
  }

  private solicitarCodigo2FA(userId: string, attempts = 1): void {
    Swal.fire({
      title: `Segundo Factor (Intento ${attempts}/3)`,
      text: 'Ingresa el código enviado a tu correo.',
      input: 'text',
      inputPlaceholder: 'Código 2FA',
      showCancelButton: true,
      confirmButtonText: 'Validar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then(result => {
      if (result.isConfirmed && result.value) {
        this.isLoading = true;
        this.securityService.validate2FA(userId, result.value).subscribe({
          next: (data2FA) => {
            this.isLoading = false;
            if (data2FA && data2FA.token) {
              this.securityService.saveSession(data2FA);
              this.router.navigate(['dashboard']);
            } else {
              Swal.fire('Error', 'Código inválido o respuesta incorrecta.', 'error');
            }
          },
          error: (err) => {
            this.isLoading = false;
            const msg = err?.error?.message || 'Error al validar el código 2FA.';
            if (msg === 'Número máximo de intentos alcanzado' || attempts >= 3) {
              Swal.fire('Bloqueado', 'Has superado el número máximo de intentos.', 'error');
            } else {
              Swal.fire('Código incorrecto', 'Intenta nuevamente.', 'warning').then(() => {
                this.solicitarCodigo2FA(userId, attempts + 1);
              });
            }
          }
        });
      } else {
        this.isLoading = false;
        Swal.fire('Cancelado', 'La autenticación 2FA fue cancelada.', 'info');
      }
    });
  }

  onGoogleLogin(): void {
    this.authService.loginWithGoogle();
  }

  onGithubLogin(): void {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${environment.githubClientId}&redirect_uri=${encodeURIComponent(environment.url_ms_security + '/api/auth/github/callback')}&scope=user:email`;
    window.location.href = githubAuthUrl;
  }

}
