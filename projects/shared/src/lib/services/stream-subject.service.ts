import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreamSubjectService {
  private streamScopesSubject = new BehaviorSubject<any>(null);

  scopes$: Observable<any> = this.streamScopesSubject.asObservable();

  setScopes(data: any): void {
    this.streamScopesSubject.next(data);
  }
}
