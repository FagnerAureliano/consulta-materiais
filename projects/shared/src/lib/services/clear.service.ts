import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClearService {
  private clearSubject = new BehaviorSubject<void>(null);

  clear$ = this.clearSubject.asObservable();

  constructor() { }

  triggerClear() {
    this.clearSubject.next();
  }
}
