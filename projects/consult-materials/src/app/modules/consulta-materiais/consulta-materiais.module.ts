import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import localePt from '@angular/common/locales/pt';

import { ConsultaMateriaisRoutingModule } from './consulta-materiais-routing.module';
import { MaterialCardsComponent } from './components/material-card/material-card.component';
import { WordsManipulateModule } from 'projects/shared/src/lib/pipes/words-manipulate.module';
import { TagInputModule } from 'projects/shared/src/lib/components/tag-input/tag-input.module';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { GuiaCadastroFormComponent } from './components/guia-cadastro-form/guia-cadastro-form.component';
import { ConsultaContainerComponent } from './containers/consulta-container/consulta-container.component';
import { GuiaCadastroContainerComponent } from './containers/guia-cadastro-container/guia-cadastro-container.component';
import { DocumentoCadastroFormComponent } from './components/documento-cadastro-form/documento-cadastro-form.component';
import { DocumentoCadastroContainerComponent } from './containers/documento-cadastro-container/documento-cadastro-container.component';

import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { ScrollTopModule } from 'primeng/scrolltop';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

registerLocaleData(localePt);

const PRIME_COMPONENTS = [
  TagModule,
  CardModule,
  MenuModule,
  ToastModule,
  ChipsModule,
  ButtonModule,
  DialogModule,
  EditorModule,
  DividerModule,
  AccordionModule,
  ScrollTopModule,
  FileUploadModule,
  ConfirmDialogModule,
  InputTextareaModule,
  VirtualScrollerModule,
];

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
    WordsManipulateModule,
    ConsultaMateriaisRoutingModule,

    PRIME_COMPONENTS,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ConsultaMateriaisModule {}
