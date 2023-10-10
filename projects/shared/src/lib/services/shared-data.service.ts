import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private scopesSubject = new BehaviorSubject<any>(null);
  private questionsSubject = new BehaviorSubject<any>(null);

  scopes$: Observable<any> = this.scopesSubject.asObservable();
  questions$: Observable<any> = this.questionsSubject.asObservable();

  setScopes(scopes: any): void {
    this.scopesSubject.next(scopes);
  }
  setQuestions(data: any): void {
    this.questionsSubject.next(data);
  }
}
