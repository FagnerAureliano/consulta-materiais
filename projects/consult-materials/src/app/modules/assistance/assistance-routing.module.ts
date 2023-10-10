import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FAQCreateResolver } from './resolver/faq-create.resolver';
import { FaqCadastroComponent } from './containers/faq-cadastro/faq-cadastro.component';
import { FaqContainerComponent } from './containers/faq-container/faq-container.component';
import { ContentContainerComponent } from './containers/content-container/content-container.component';
import { MaterialsLinksContainerComponent } from './containers/materials-links-container/materials-links-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'content/faq',
    pathMatch: 'full',
  },
  {
    path: 'content/faq',
    component: FaqCadastroComponent,
    resolve: { data: FAQCreateResolver },
    children: [
      {
        path: 'create',
        component: FaqCadastroComponent,
        resolve: { data: FAQCreateResolver },
      },
      {
        path: 'update/:id',
        component: FaqCadastroComponent,
        resolve: { data: FAQCreateResolver },
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
        resolve: { data: FAQCreateResolver },
      },
      {
        path: 'video',
        component: MaterialsLinksContainerComponent,
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
