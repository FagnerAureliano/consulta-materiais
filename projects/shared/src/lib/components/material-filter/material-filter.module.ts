import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SearchboxModule } from '../searchbox/searchbox.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialFilterComponent } from './material-filter.component';
import { WordsManipulateModule } from '../../pipes/words-manipulate.module';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';

const PRIME_MODULE = [
  ButtonModule,
  DividerModule,
  CheckboxModule,
  DropdownModule,
  AccordionModule,
];

@NgModule({
  declarations: [MaterialFilterComponent],
  exports: [MaterialFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    SearchboxModule,
    ReactiveFormsModule,
    WordsManipulateModule,

    PRIME_MODULE,
  ],
})
export class MaterialFilterModule {}
