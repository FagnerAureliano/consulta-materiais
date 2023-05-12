import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { BaseWrapperModule } from 'projects/shared/src/lib/components/base-wrapper/base-wrapper.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BaseWrapperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
