import { NgModule } from '@angular/core';
import { ContentResolver } from '../assistance/resolver/content.resolver';
import { CadastroResolver } from './resolver/cadastro.resolver';
import { RouterModule, Routes } from '@angular/router';
// import { FaqContainerComponent } from './containers/faq-container/faq-container.component';
import { ContentContainerComponent } from '../assistance/containers/content-container/content-container.component';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component';
import { DocumentoCadastroContainerComponent } from './containers/documento-cadastro-container/documento-cadastro-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: 'search',
    component: ConsultaContainerComponent,
  },
  {
    path: 'guia-cadastro',
    component: GuiaCadastroContainerComponent,
    resolve: { data: CadastroResolver },
    children: [
      {
        path: 'edit/:id',
        component: GuiaCadastroContainerComponent,
      },
    ],
  },
  {
    path: 'documento-cadastro',
    component: DocumentoCadastroContainerComponent,
    resolve: { data: CadastroResolver },
    children: [
      {
        path: 'edit/:id',
        component: DocumentoCadastroContainerComponent,
      },
    ],
  },
  // {
  //   path: 'content/:scope',
  //   component: ContentContainerComponent,
  //   resolve: { data: ContentResolver },
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'faq',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'faq',
  //       component: FaqContainerComponent,
  //     },
  //     {
  //       path: 'other',
  //       component: FaqContainerComponent,
  //     },
  //   ],
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaMateriaisRoutingModule {}
