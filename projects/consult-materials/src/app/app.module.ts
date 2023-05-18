import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BaseWrapperModule } from '@shared';

import { authProviderBuilder } from '@auth';

import { KeycloakAngularModule } from 'keycloak-angular';
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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    BaseWrapperModule,
  ],
  providers: [
    authProvider,
    { provide: 'SEARCH_FRONT_URL', useValue: environment.SEARCH_FRONT_URL },
    { provide: 'API_ENDPOINT', useValue: environment.API_ENDPOINT },
    { provide: 'production', useValue: environment.production },
    { provide: 'homolog', useValue: environment.homolog },
    { provide: 'development', useValue: environment.development },
    { provide: 'version', useValue: environment.version },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
