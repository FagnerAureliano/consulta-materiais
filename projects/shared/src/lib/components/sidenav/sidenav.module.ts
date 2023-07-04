import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ClickOutsideModule } from '../../directives/click-outside.module';
import { MaterialFilterModule } from '../material-filter/material-filter.module';
import { SearchboxModule } from '../searchbox/searchbox.module';
import { SidenavItemComponent } from './sidenav-item.component';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent, SidenavItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DividerModule,
    SearchboxModule,
    ClickOutsideModule,
    MaterialFilterModule,
  ],
  exports: [SidenavComponent, SidenavItemComponent],
})
export class SidenavModule {}
