import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private questionsSubject = new BehaviorSubject<any>(null);
  private scopesSubject = new BehaviorSubject<any>(null);
  private actualScopesSubject = new BehaviorSubject<any>(null);

  questions$: Observable<any> = this.questionsSubject.asObservable();
  scopes$: Observable<any> = this.scopesSubject.asObservable();
  actualScope$: Observable<any> = this.actualScopesSubject.asObservable();

  setQuestions(data: any) {
    this.questionsSubject.next(data);
  }

  setScopes(scopes: any): void {
    this.scopesSubject.next(scopes);
  }
   setActualScopes(actual: any): void {
    this.scopesSubject.next(actual);
  }
}
