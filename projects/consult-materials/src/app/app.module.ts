import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseWrapperModule } from '@shared';
import { authProviderBuilder } from '@auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const authProvider = authProviderBuilder({
  url: environment.KEYCLOAK_URL,
  realm: environment.KEYCLOAK_REALM,
  clientId: environment.KEYCLOAK_CLIENT_ID,
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BaseWrapperModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
  ],
  providers: [
    authProvider,
    { provide: 'production', useValue: environment.production },
    { provide: 'SEARCH_FRONT_URL', useValue: environment.SEARCH_FRONT_URL },
    { provide: 'USER_API_ENDPOINT', useValue: environment.USER_API_ENDPOINT },
    { provide: 'SEARCH_API_ENDPOINT', useValue: environment.SEARCH_API_ENDPOINT },
    { provide: 'STREAM_API_ENDPOINT', useValue: environment.STREAM_API_ENDPOINT }, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
