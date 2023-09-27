import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private questionSubject = new BehaviorSubject<any>(null);
  private questionsSubject = new BehaviorSubject<any>(null);
  private scopesSubject = new BehaviorSubject<any>(null);
  private actualScopesSubject = new BehaviorSubject<any>(null);

  question$: Observable<any> = this.questionSubject.asObservable();
  questions$: Observable<any> = this.questionsSubject.asObservable();
  scopes$: Observable<any> = this.scopesSubject.asObservable();
  actualScope$: Observable<any> = this.actualScopesSubject.asObservable();

  setQuestion(data: any) {
    this.questionSubject.next(data);
  }
  setQuestions(data: any) {
    this.questionsSubject.next(data);
  }
  setScopes(scopes: any): void {
    this.scopesSubject.next(scopes);
  }
  setActualScopes(actual: any): void {
    this.actualScopesSubject.next(actual);
  }
}
