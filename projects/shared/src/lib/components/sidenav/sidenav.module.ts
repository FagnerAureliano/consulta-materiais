import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SidenavItemComponent } from './sidenav-item.component';
import { ClickOutsideModule } from '../../directives/click-outside.module';
import { ButtonModule } from 'primeng/button';
import { SearchboxModule } from '../searchbox/searchbox.module';
import { DividerModule } from 'primeng/divider'; 
import { MaterialFilterModule } from '../material-filter/material-filter.module';

@NgModule({
  declarations: [SidenavComponent, SidenavItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClickOutsideModule,
    ButtonModule,
    SearchboxModule,
    DividerModule,
    MaterialFilterModule,
  ],
  exports: [SidenavComponent, SidenavItemComponent],
})
export class SidenavModule {}
