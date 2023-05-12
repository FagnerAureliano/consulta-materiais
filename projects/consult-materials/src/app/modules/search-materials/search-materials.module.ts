import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchMaterialsRoutingModule } from './search-materials-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SearchMaterialsRoutingModule,
    LoadingBarModule
  ]
})
export class SearchMaterialsModule { }
