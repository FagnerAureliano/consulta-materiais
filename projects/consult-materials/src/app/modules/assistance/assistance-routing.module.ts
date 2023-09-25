import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from './containers/content-container/content-container.component';
import { ContentResolver } from './resolver/content.resolver';
import { FaqContainerComponent } from './containers/faq-container/faq-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'content',
    pathMatch: 'full',
  },
  {
    path: 'content',
    component: ContentContainerComponent,
  },
  {
    path: 'content/:scope',
    component: ContentContainerComponent,
    resolve: { data: ContentResolver },
    children: [
      {
        path: '',
        redirectTo: 'faq',
        pathMatch: 'full',
      },
      {
        path: 'faq',
        component: FaqContainerComponent,
      },
      {
        path: 'other',
        component: FaqContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceRoutingModule {}
