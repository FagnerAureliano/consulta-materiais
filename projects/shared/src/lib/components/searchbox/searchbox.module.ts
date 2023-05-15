import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';

import { SearchboxComponent } from './searchbox.component';

@NgModule({
  declarations: [SearchboxComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule],
  exports: [SearchboxComponent],
})
export class SearchboxModule {}
