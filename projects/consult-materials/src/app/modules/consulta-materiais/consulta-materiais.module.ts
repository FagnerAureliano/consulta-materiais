import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';

import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { ConsultaMateriaisRoutingModule } from './consulta-materiais-routing.module';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { MaterialCardsComponent } from './components/material-card/material-card.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { MenuModule } from 'primeng/menu';
import { ScrollTopModule } from 'primeng/scrolltop';
import { EditorModule } from 'primeng/editor';
import { GuiaCadastroFormComponent } from './components/guia-cadastro-form/guia-cadastro-form.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [ 
    ConsultaContainerComponent,
    MaterialCardsComponent,
    MaterialDetailComponent,
    GuiaCadastroContainerComponent,
    GuiaCadastroFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConsultaMateriaisRoutingModule,
    LoadingBarModule,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    DialogModule,
    VirtualScrollerModule,
    MenuModule,
    ScrollTopModule,
    EditorModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ConsultaMateriaisModule {}
