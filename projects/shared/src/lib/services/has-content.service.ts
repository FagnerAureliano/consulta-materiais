import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HasContentService {
  private hasContent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setActive(hasContent: boolean): void {
    this.hasContent$.next(hasContent);
  }

  getActive(): Observable<boolean> {
    return this.hasContent$.asObservable();
  }
}
