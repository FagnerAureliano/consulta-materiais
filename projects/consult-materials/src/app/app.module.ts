import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { BaseWrapperModule } from 'projects/shared/src/lib/components/base-wrapper/base-wrapper.module';
import { HttpClientModule } from '@angular/common/http';
import { KeycloakAngularModule } from 'keycloak-angular';
import { environment } from '../environments/environment';
import { authProviderBuilder } from '@auth';

const authProvider = authProviderBuilder({
  url: environment.KEYCLOAK_URL,
  realm: environment.KEYCLOAK_REALM,
  clientId: environment.KEYCLOAK_CLIENT_ID,
});


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule,
    BaseWrapperModule,
  ],
  providers: [
    // authProvider,
    { provide: 'API_ENDPOINT', useValue: environment.API_URL },
    { provide: 'production', useValue: environment.production },
    { provide: 'homolog', useValue: environment.homolog },
    { provide: 'development', useValue: environment.development },
    { provide: 'version', useValue: environment.version },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
