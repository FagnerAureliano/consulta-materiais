import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssistanceRoutingModule } from './assistance-routing.module';
import { FaqCadastroComponent } from './components/faq-cadastro/faq-cadastro.component';
import { FaqDetailComponent } from './components/faq-detail/faq-detail.component';
import { FaqContainerComponent } from './containers/faq-container/faq-container.component';

import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { TagInputModule } from 'projects/shared/src/lib/components/tag-input/tag-input.module';
import { WordsManipulateModule } from 'projects/shared/src/lib/pipes/words-manipulate.module';

import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { ScrollTopModule } from 'primeng/scrolltop';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { VirtualScrollerModule } from 'primeng/virtualscroller';

const PRIME_COMPONENTS = [
  TagModule,
  CardModule,
  MenuModule,
  ToastModule,
  ChipsModule,
  ButtonModule,
  DialogModule,
  EditorModule,
  TabViewModule,
  DividerModule,
  DropdownModule,
  AccordionModule,
  ScrollTopModule,
  FileUploadModule,
  ConfirmDialogModule,
  InputTextareaModule,
  ProgressSpinnerModule,
  VirtualScrollerModule,
];

@NgModule({
  declarations: [
    FaqDetailComponent,
    FaqCadastroComponent,
    FaqContainerComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    TagInputModule,
    LoadingBarModule,
    ReactiveFormsModule,
    WordsManipulateModule,
    AssistanceRoutingModule,

    PRIME_COMPONENTS,
  ],
})
export class AssistanceModule {}
