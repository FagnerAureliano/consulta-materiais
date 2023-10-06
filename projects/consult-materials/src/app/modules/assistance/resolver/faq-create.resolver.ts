import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

import { FAQService } from '../../../services/faq.service';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';
import { SharedDataService } from 'projects/shared/src/lib/services/shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class FaqCreateResolver implements Resolve<any> {
  constructor(
    private faqService: FAQService,
    private sharedDataService: SharedDataService,
    private streamService: StreamMaterialsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let urlSegments = route['_routerState'].url.split('/');
    const scope = urlSegments[3];
    this.sharedDataService.setActualScopes(scope);

    if (route.params.id) {
      return forkJoin({
        question: this.faqService
          .getQuestionsByID(route.params.id)
          .pipe(first()),
        questions: this.faqService.getQuestionsByScope(scope).pipe(first()),
        allScopes: this.streamService.getScopes().pipe(first()),
      });
    } else {
      return forkJoin({
        questions: this.faqService.getQuestionsByScope(scope).pipe(first()),
        allScopes: this.streamService.getScopes().pipe(first()),
      });
    }
  }
}
