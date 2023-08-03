import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component';
import { DocumentoCadastroContainerComponent } from './containers/documento-cadastro-container/documento-cadastro-container.component';
import { CadastroResolver } from './resolver/cadastro.resolver';

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

    children: [
      {
        path: 'edit/:id',
        component: GuiaCadastroContainerComponent,
        resolve: { data: CadastroResolver },
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaMateriaisRoutingModule {}
