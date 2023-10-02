import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { FAQService } from '../../../services/faq.service';
import { first, switchMap } from 'rxjs/operators';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';
import { Scopes } from '../../../models/scopes.models';

@Injectable({
  providedIn: 'root',
})
export class ContentResolver implements Resolve<any> {
  constructor(
    private faqService: FAQService,
    private streamService: StreamMaterialsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let urlSegments = route['_routerState'].url.split('/');
    const actualScope = urlSegments[3];

    return this.streamService.getScopes().pipe(
      first(),
      switchMap((allScopes) => {
        let pathScope: Scopes = allScopes.find(
          (res) => res.scope === actualScope.toUpperCase()
        );
        if (!pathScope) {
          pathScope = allScopes[1];
        }
        return forkJoin({
          allScopes: of(allScopes),
          questions: this.faqService
            .searchQuestions('', pathScope.id)
            .pipe(first()),
          scopes: this.streamService.getUserScopes().pipe(first()),
        });
      })
    );
  }
}
