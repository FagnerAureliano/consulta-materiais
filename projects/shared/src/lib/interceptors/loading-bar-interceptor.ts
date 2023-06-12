import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';
import { LoadingBarService } from '../services/loading-bar.service';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  private activeRequests = 0;
  constructor(private loadingService: LoadingBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequests === 0) {
      // this.loadingService.start();
    }
    this.activeRequests++;

    console.log('test interceptor loading');
    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          // this.loadingService.end();
        }
      })
    );
  }
}
