import { Injectable, Injector } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import {
  LoadingBarService,
  NameByRole,
  Role,
  User,
  UserService,
} from '@shared';

import { Observable } from 'rxjs';

import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivateChild {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    protected userService: UserService,
    private loading: LoadingBarService
  ) {
    super(router, keycloak);
  }

  private handleUserName(username: string): string {
    return (
      username
        ?.split(' ')
        ?.map((name) => {
          return name
            ? `${name[0]?.toUpperCase()}${name?.slice(1)?.toLowerCase()}`
            : null;
        })
        ?.join(' ') || 'Usuário não identificado'
    );
  }

  private handleRoles(roles: string[]): string[] {
    return (
      roles
        // ?.filter((role) => role?.includes('ROLE_MATERIAL_APOIO_USER'))
        ?.filter((role) => role?.includes('ROLE_SISPLAER_USER'))
        ?.map((role) => NameByRole[role])
        ?.sort() || []
    );
  }

  private handleUserRoles(requiredRoles): boolean {
    requiredRoles = requiredRoles?.map((role) => role.replace('ROLE_', ''));

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.some((role) => this.roles.includes(role))) {
      alert(
        'Você não tem permissão para acessar essa área do sistema. Entre em contato com o admnistrador ou abra um chamado para a equipe responsável'
      );

      if (!this.roles.some((role) => role === Role.USER.replace('ROLE_', ''))) {
        this.keycloak.logout('http://www.sti.intraer/index.php/sisplaer.html');
      }

      // this.router.navigate(['403']);
      this.loading.end();
      return false;
    }

    // Allow the user to proceed if all the required roles are present.
    return true;
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    } else {
      try {

        console.log('user');
        if (!this.userService.user) {
          const user: User = await this.userService
            .getCurrentUser()
            .toPromise();
            console.log(user);


          this.userService.user = user;
          this.userService.user.pessoa.nome = this.handleUserName(
            user.pessoa.nome
          );
          this.userService.user.mapedRoles = this.handleRoles(user.roles);
        }
      } catch (err) {
        this.userService.user = {
          username: null,
          pessoa: { nome: 'Usuário não identificado' },
          roles: null,
        };
      }
    }

    return this.handleUserRoles(route.data?.roles);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.handleUserRoles(route.data?.roles);
  }
}
