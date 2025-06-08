import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService, private http: HttpClient) {
    // Configuración directa aquí en vez de googleAuthConfig externo
    this.oauthService.configure({
      issuer: environment.googleIssuer, // Ajusta según tu environment
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin,
      clientId: environment.googleClientId,
      scope: 'openid profile email',
      responseType: 'id_token token',
      showDebugInformation: true,
      sessionChecksEnabled: true
    });
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      const idToken = this.oauthService.getIdToken();
      if (idToken) {
        this.sendGoogleTokenToBackend(idToken);
      }
    });
  }

  loginWithGoogle() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  get accessToken() {
    return this.oauthService.getAccessToken();
  }

  private sendGoogleTokenToBackend(idToken: string) {
    this.http.post(`${environment.url_ms_security}/api/auth/google`, { idToken })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          // Redirige si es necesario
        },
        error: () => {
          // Manejo de error
        }
      });
  }
}
