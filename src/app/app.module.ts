import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ManageComponent } from './pages/obra-municipal/manage/manage.component'; // Asegúrate de que TheatersModule esté importado
import { AuthInterceptor } from './interceptor/oauth.interceptor'; // Asumo que este es tu JWT interceptor
import { RequestResetPasswordComponent } from './pages/request-reset-password/request-reset-password.component';
import { ResetPasswordSentComponentComponent } from './pages/reset-password-sent-component/reset-password-sent-component.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

// --- NUEVAS IMPORTACIONES PARA OAUTH2 ---
import { OAuthModule, AuthConfig } from 'angular-oauth2-oidc'; // JwksValidationHandler no se importa aquí, se usa en el servicio
import { environment } from 'src/environments/environment'; // Para acceder a googleClientId y googleIssuer

// --- NUEVA CONFIGURACIÓN PARA OAUTH2 (Google) ---
export const authConfig: AuthConfig = {
  issuer: environment.googleIssuer, // 'https://accounts.google.com'
  strictDiscoveryDocumentValidation: false, // Desactivar si tienes problemas con el documento de descubrimiento
  redirectUri: window.location.origin, // O la URL específica de redirección si Google no está en la raíz
  clientId: environment.googleClientId, // Tu ID de Cliente de Google
  scope: 'openid profile email', // Ámbitos de Google (email y profile son útiles)
  responseType: 'id_token token', // Flujo implícito (para SPAs), o 'code' para Code Flow con PKCE
  showDebugInformation: true, // Útil para depuración durante el desarrollo
  sessionChecksEnabled: true // Para mantener la sesión activa con Google
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    // --- NUEVO: Configuración de OAuthModule ---
    OAuthModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [environment.url_ms_security + '/api'], // URLs de tu backend Spring Boot que requieren token de acceso (de Google)
        sendAccessToken: true // Enviar el token de acceso de Google en las cabeceras a las allowedUrls
      }
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    RequestResetPasswordComponent,
    ResetPasswordSentComponentComponent,
    VerifyCodeComponent,
    // ManageComponent, // Si ManageComponent se usa en rutas de AdminLayout o AuthLayout, asegúrate de que no se declare aquí si ya está en otro módulo importado.
                      // Si lo usas directamente en AppRoutingModule y no en otro Feature Module, déjalo aquí.
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Tu interceptor actual. Asegúrate de que maneje bien los tokens de Google y los JWTs propios.
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }