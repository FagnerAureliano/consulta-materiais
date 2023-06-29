import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingBarService } from '../services/loading-bar.service';

@Injectable()
export class LoadingBarInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    @Inject('production') private production: any,
    private loadingService: LoadingBarService
  ) {}

  removeRequest(req: HttpRequest<any>) {
    const index = this.requests.indexOf(req);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    
    const isLoading = this.requests.length > 0;
    
    if (isLoading) {
      this.loadingService.start();
    } else {
      setTimeout(() => {
        this.loadingService.end();
      }, 300);
    }
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.requests.push(req);
    this.loadingService.start();

    return next.handle(req).pipe(
      catchError((err) => {
        // if (!this.production) {
        //   alert('error' + err);
        // }
        return throwError(err);
      }),
      finalize(() => {
        this.removeRequest(req);
      })
    );
  }
}
