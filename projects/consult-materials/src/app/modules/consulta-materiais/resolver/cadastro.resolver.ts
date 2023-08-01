import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '@shared';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Scopes } from '../../../models/scopes.models';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';
import { SearchMaterialsService } from '../../../services/search-materiais.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroResolver implements Resolve<any> {
  constructor(
    private streamService: StreamMaterialsService,
    private searchService: SearchMaterialsService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (route.params && route.params.id) {
      
      return forkJoin({
        scopes: this.streamService.getScopes().pipe(
          map((res: Scopes[]) => {
            const userRoles = this.userService.user.roles.filter(
              (role: string) =>
                role.includes('MATERIAL_APOIO') && !role.includes('USER')
            );

            return res
              .filter((objeto: Scopes) =>
                userRoles.some((role: string) => role.includes(objeto.scope))
              )
              .sort();
          })
        ),
        material: this.searchService.getDocumentByID('3c887ff6-dede-4e30-a650-aca999eecf0a'),
      });
    } else {
      return forkJoin({

        scopes: this.streamService.getScopes().pipe(
          map((res: Scopes[]) => {
            const userRoles = this.userService.user.roles.filter(
              (role: string) =>
                role.includes('MATERIAL_APOIO') && !role.includes('USER')
            );

            return res
              .filter((objeto: Scopes) =>
                userRoles.some((role: string) => role.includes(objeto.scope))
              )
              .sort();
          })
        ),
      });
    }
  }
}
