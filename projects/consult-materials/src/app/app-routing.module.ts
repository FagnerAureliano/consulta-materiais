import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {},
    children: [
      {
        path: '',
        redirectTo: `${environment.SEARCH_FRONT_URL}`,
        pathMatch: 'full',
      },
      {
        path: 'materials',
        loadChildren: () =>
          import('./modules/consulta-materiais/consulta-materiais.module').then(
            (m) => m.ConsultaMateriaisModule
          ),
      },
      {
        path: 'assistance',
        loadChildren: () =>
          import('./modules/assistance/assistance.module').then(
            (m) => m.AssistanceModule
          ),
      },
      {
        path: 'help',
        loadChildren: () =>
          import('./modules/help/help.module').then(
            (m) => m.HelpModule
          ),
      },
      {
        path: '**',
        children: [],
        resolve: {
          url: 'externalUrlRedirectResolver',
        },
        data: {
          externalUrl: `${environment.SEARCH_FRONT_URL}/materials/`,
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
