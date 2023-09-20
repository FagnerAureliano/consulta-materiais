import { Injectable } from '@angular/core';
import { 
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { ContentService } from '../../../services/content.service';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<any> {

  constructor(private contentService: ContentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const scope = route.paramMap.get('scope');

    return forkJoin({
      questions: this.contentService.getQuestions(),
    });
  }
}
