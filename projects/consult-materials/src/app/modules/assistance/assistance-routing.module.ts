import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentContainerComponent } from './containers/content-container/content-container.component';
import { ContentResolver } from './resolver/content.resolver';
import { FaqContainerComponent } from './containers/faq-container/faq-container.component';
import { FaqCadastroComponent } from './containers/faq-cadastro/faq-cadastro.component';

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
    path: 'content/faq/cadastro',
    component: FaqCadastroComponent, 
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
        path: 'manuais',
        component: FaqCadastroComponent,
        resolve: { data: ContentResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceRoutingModule {}
