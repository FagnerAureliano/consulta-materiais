import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '',
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
      externalUrl: `${environment.API_URL}`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
