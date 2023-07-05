import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialFilterService {
  private content$: Subject<any> = new Subject<any>();
  inputChange$ = this.content$.asObservable();

  emitContent(content: Object): void {
    this.content$.next(content);
  }
}
