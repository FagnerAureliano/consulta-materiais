import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import localePt from '@angular/common/locales/pt';

import { TagInputModule } from 'projects/shared/src/lib/components/tag-input/tag-input.module';
import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { MaterialCardsComponent } from './components/material-card/material-card.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { GuiaCadastroFormComponent } from './components/guia-cadastro-form/guia-cadastro-form.component';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component';
import { DocumentoCadastroFormComponent } from './components/documento-cadastro-form/documento-cadastro-form.component';
import { ConsultaMateriaisRoutingModule } from './consulta-materiais-routing.module';
import { DocumentoCadastroContainerComponent } from './containers/documento-cadastro-container/documento-cadastro-container.component';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipsModule } from 'primeng/chips';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ScrollTopModule } from 'primeng/scrolltop';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    MaterialCardsComponent,
    MaterialDetailComponent,
    GuiaCadastroFormComponent,
    ConsultaContainerComponent,
    GuiaCadastroContainerComponent,
    DocumentoCadastroFormComponent,
    DocumentoCadastroContainerComponent,
  ],
  imports: [
    //Core
    FormsModule,
    CommonModule,
    TagInputModule,
    LoadingBarModule,
    ReactiveFormsModule,
    ConsultaMateriaisRoutingModule,

    // PrimeModules
    TagModule,
    CardModule,
    MenuModule,
    ChipsModule,
    ButtonModule,
    DialogModule,
    EditorModule,
    DividerModule,
    AccordionModule,
    ScrollTopModule,
    FileUploadModule,
    InputTextareaModule,
    VirtualScrollerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ConsultaMateriaisModule {}
