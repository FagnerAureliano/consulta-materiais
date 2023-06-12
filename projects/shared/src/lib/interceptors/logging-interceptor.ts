import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoggingInterceptor implements HttpInterceptor {
  constructor(@Inject('production') private production: any) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      finalize(() => {
        if (!this.production) {
          const elapsed = Date.now() - started;          
          console.log(
            `URL: ${req.url} Method: ${req.method} Time took: ${elapsed} ms`
          );
        }
      }),
      share()
    );
  }
}
