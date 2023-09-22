import { Injectable } from '@angular/core';
import { 
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { ContentService } from '../../../services/content.service';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<any> {

  constructor(
    private contentService: ContentService,
    private streamService: StreamMaterialsService
    ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const scope = route.paramMap.get('scope');

    return forkJoin({
      questions: this.contentService.getQuestions(),
      scopes: this.streamService.getUserScopes().pipe(first())
    });
  }
}
