import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component'; 

const routes: Routes = [
  {
    path: 'search',
    component: ConsultaContainerComponent,
  },
  {
    path: 'guia-cadastro',
    component: GuiaCadastroContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaMateriaisRoutingModule {}
