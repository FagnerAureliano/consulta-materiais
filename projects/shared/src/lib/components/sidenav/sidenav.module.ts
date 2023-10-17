import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

import { SidenavComponent } from './sidenav.component';
import { SearchboxModule } from '../searchbox/searchbox.module';
import { SidenavItemComponent } from './sidenav-item.component';
import { ClickOutsideModule } from '../../directives/click-outside.module';
import { WordsManipulateModule } from '../../pipes/words-manipulate.module';
import { MaterialFilterModule } from '../material-filter/material-filter.module';

@NgModule({
  declarations: [SidenavComponent, SidenavItemComponent],
  exports: [SidenavComponent, SidenavItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DividerModule,
    SearchboxModule,
    ClickOutsideModule,
    MaterialFilterModule,
    WordsManipulateModule,
  ],
})
export class SidenavModule {}
