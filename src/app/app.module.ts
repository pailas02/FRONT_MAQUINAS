import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
// import { ListComponent } from './pages/theaters/list/list.component'; // Ya declarado en TheatersModule
// import { ManageComponent } from './pages/theaters/manage/manage.component'; // Ya declarado en TheatersModule
import { ManageComponent } from './pages/obra-municipal/manage/manage.component'; // Asegúrate de que TheatersModule esté importado
import { AuthInterceptor } from './interceptor/oauth.interceptor';
import { NoAuthenticatedGuard } from './gurds/no-authenticated.guard';
import { AuthenticatedGuard } from './gurds/authenticated.guard';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
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
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthenticatedGuard,
    NoAuthenticatedGuard 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }