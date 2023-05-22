import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialFilterComponent } from './material-filter.component';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MaterialFilterComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    AccordionModule,
    CheckboxModule,
  ],
  exports: [MaterialFilterComponent],
})
export class MaterialFilterModule {}
