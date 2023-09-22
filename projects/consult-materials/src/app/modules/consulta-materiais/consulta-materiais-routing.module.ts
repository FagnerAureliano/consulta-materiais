import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { DocumentoCadastroContainerComponent } from './containers/documento-cadastro-container/documento-cadastro-container.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component';
import { CadastroResolver } from './resolver/cadastro.resolver';
import { ContentContainerComponent } from './containers/content-container/content-container.component';
import { ContentResolver } from './resolver/content.resolver';
import { FaqComponent } from './components/faq/faq.component';
import { FaqCadastroComponent } from './components/faq-cadastro/faq-cadastro.component';

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

  {
    path: 'content/:scope',
    component: ContentContainerComponent,
    resolve: {data: ContentResolver},
    children: [
      {
        path: '',
        redirectTo: 'faq',
        pathMatch: 'full'
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'other',
        component: FaqComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaMateriaisRoutingModule {}
