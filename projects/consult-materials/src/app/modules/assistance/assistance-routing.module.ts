import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from './containers/content-container/content-container.component';
import { ContentResolver } from './resolver/content.resolver';
import { FaqContainerComponent } from './containers/faq-container/faq-container.component';
import { FaqCadastroComponent } from './containers/faq-cadastro/faq-cadastro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'content/faq',
    pathMatch: 'full',
  },
  {
    path: 'content/faq',
    component: FaqCadastroComponent,
    resolve: { data: ContentResolver },
    children: [
      {
        path: 'create',
        component: FaqCadastroComponent,
        resolve: { data: ContentResolver },
      },
      {
        path: 'update/:id',
        component: FaqCadastroComponent,
        resolve: { data: ContentResolver },
      },
    ],
  },
  {
    path: 'content/:scope',
    component: ContentContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'faq',
        pathMatch: 'full',
      },
      {
        path: 'faq',
        component: FaqContainerComponent,
        resolve: { data: ContentResolver },
      },
      {
        path: 'video',
        component: FaqCadastroComponent,
      },
      {
        path: 'guide',
        component: FaqCadastroComponent,
      },
      {
        path: 'manual',
        component: FaqCadastroComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceRoutingModule {}
