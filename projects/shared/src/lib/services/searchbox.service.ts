import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxService {
  private inputSubject: Subject<any> = new Subject<any>();

  inputChange$ = this.inputSubject.asObservable();

  emitInputChange(value: any) {
    this.inputSubject.next(value);
  }
}
