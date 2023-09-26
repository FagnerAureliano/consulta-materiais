import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { ContentService } from '../../../services/content.service';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';
import { first } from 'rxjs/operators';
import { SharedDataService } from '../../../services/shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class ContentResolver implements Resolve<any> {
  constructor(
    private contentService: ContentService,
    private streamService: StreamMaterialsService,
    private sharedDataService: SharedDataService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let urlSegments = route['_routerState'].url.split('/');
    const scope = urlSegments[3];
    this.sharedDataService.setActualScopes(scope);
    
    return forkJoin({
      questions: this.contentService.getQuestionsByScope(scope).pipe(first()),
      scopes: this.streamService.getUserScopes().pipe(first()),
      allScopes: this.streamService.getAllScopes().pipe(first()),
    });
  }
}
