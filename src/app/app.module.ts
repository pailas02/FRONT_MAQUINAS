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
// import { ListComponent } from './pages/theaters/list/list.component'; // Ya declarado en TheatersModule
// import { ManageComponent } from './pages/theaters/manage/manage.component'; // Ya declarado en TheatersModule
import { ManageComponent } from './pages/obra-municipal/manage/manage.component'; // Asegúrate de que TheatersModule esté importado
import { AuthInterceptor } from './interceptor/oauth.interceptor';
import { RequestResetPasswordComponent } from './pages/request-reset-password/request-reset-password.component';
import { ResetPasswordSentComponentComponent } from './pages/reset-password-sent-component/reset-password-sent-component.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

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
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    RequestResetPasswordComponent,
    ResetPasswordSentComponentComponent,
    VerifyCodeComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }