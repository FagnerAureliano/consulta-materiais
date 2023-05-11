import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchMaterialsRoutingModule } from './search-materials-routing.module';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SearchMaterialsRoutingModule
  ]
})
export class SearchMaterialsModule { }
