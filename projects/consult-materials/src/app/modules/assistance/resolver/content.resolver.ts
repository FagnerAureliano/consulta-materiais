import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { FAQService } from '../../../services/faq.service';
import { first } from 'rxjs/operators'; 
import { StreamMaterialsService } from '../../../services/stream-materiais.service';

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
    const scope = urlSegments[3];

    return forkJoin({
      questions: this.faqService.getQuestionsByScope(scope).pipe(first()),
      scopes: this.streamService.getUserScopes().pipe(first()),
      allScopes: this.streamService.getAllScopes().pipe(first()),
    });
  }
}
