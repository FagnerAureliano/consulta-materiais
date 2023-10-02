import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { Observable, throwError } from 'rxjs';
import { catchError, share } from 'rxjs/operators';

import { LoadingBarService } from './../services/loading-bar.service';

@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private messageService: MessageService,
    private loading: LoadingBarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 0:
            this.messageService.add({
              severity: 'error',
              summary: 'Oops',
              detail: 'Não foi possível conectar ao servidor.',
            });
            break;
          case 404:
            this.messageService.add({
              severity: 'error',
              summary: 'Tivemos um problema no nosso servidor',
              detail: 'Não foi possível se comunicar com a rota do servidor.',
            });
            break;
          case 400:
            this.messageService.add({
              severity: 'error',
              summary: 'Tivemos um problema no nosso servidor',
              detail: err.error.message,
            });
            break;
          case 503:
            this.messageService.add({
              severity: 'error',
              summary: 'Serviço indisponível',
              detail: err.error.message,
            });
            break;
          case 500:
            this.messageService.add({
              severity: 'error',
              summary: 'Tivemos um problema no nosso servidor',
              detail: err.error.message.includes('5.000 milliseconds')
                ? 'Favor tente novamente.'
                : err.error.message,
            });
            break;
        }

        this.loading.end();
        return throwError(err.error);
      }),
      share()
    );
  }
}
