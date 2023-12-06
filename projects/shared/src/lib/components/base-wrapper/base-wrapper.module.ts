import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';
import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseWrapperComponent } from './base-wrapper.component';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { LoadingBarModule } from '../loading-bar/loading-bar.module';
import { SidenavModule } from '../sidenav/sidenav.module';
import { LoggingInterceptor } from '../../interceptors/logging-interceptor';
import { RequestInterceptor } from '../../interceptors/request-interceptor';
import { LoadingBarService } from '../../services/loading-bar.service';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { LoadingBarInterceptor } from '../../interceptors/loading-bar-interceptor';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';

const PRIMENG_MODUES = [
  CardModule,
  ToastModule,
  AvatarModule,
  ButtonModule,
  DialogModule,
  SidenavModule,
  AccordionModule,
  ProgressBarModule,
  ConfirmPopupModule,
  OverlayPanelModule,
];
@NgModule({
  declarations: [BaseWrapperComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    LoadingBarModule,

    PRIMENG_MODUES,
  ],
  exports: [BaseWrapperComponent],
  providers: [
    LoadingBarService,
    MessageService,
    ConfirmationService,
    Location,

    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingBarInterceptor,
      multi: true,
    },
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      },
    },
  ],
})
export class BaseWrapperModule {}
