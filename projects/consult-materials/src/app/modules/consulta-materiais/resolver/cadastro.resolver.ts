import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroResolver implements Resolve<any> {
  constructor(private streamService: StreamMaterialsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.streamService.getUserScopes().pipe(first());
  }
}
