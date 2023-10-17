import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FAQLinksService {
  private materialLinkUUIDSubject = new BehaviorSubject<any>(null);

  materialLinkUUID$: Observable<any> =
    this.materialLinkUUIDSubject.asObservable();

  setLinkUUID(data: any): void {
    this.materialLinkUUIDSubject.next(data);
  }
}
