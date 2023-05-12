import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseWrapperComponent } from './base-wrapper.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingBarModule } from '../loading-bar/loading-bar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { LoggingInterceptor } from '../../interceptors/logging-interceptor';
import { RequestInterceptor } from '../../interceptors/request-interceptor';
import { LoadingBarService } from '../../services/loading-bar.service';

 

@NgModule({
  declarations: [BaseWrapperComponent],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    LoadingBarModule,
    ToastModule,
    RouterModule,
    SidenavModule
  ],
  exports: [BaseWrapperComponent],
  providers: [
    LoadingBarService,
    MessageService 
  ],
})
export class BaseWrapperModule { }
