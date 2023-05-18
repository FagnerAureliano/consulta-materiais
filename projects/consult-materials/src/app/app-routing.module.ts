import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth';
import { Role } from '@shared';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { roles: [Role.USER] },
    children: [
      {
        path: '',
        redirectTo: `${environment.SEARCH_FRONT_URL}`,
        pathMatch: 'full',
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./modules/search-materials/search-materials.module').then(
            (m) => m.SearchMaterialsModule
          ),
      },
      {
        path: '**',
        children: [],
        resolve: {
          url: 'externalUrlRedirectResolver',
        },
        data: {
          externalUrl: `${environment.SEARCH_FRONT_URL}`,
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
