import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';



import { SearchMaterialsRoutingModule } from './search-materials-routing.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { CardsComponent } from './components/cards/cards.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    HomePageComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    SearchMaterialsRoutingModule,
    LoadingBarModule,
    CardModule,
    ButtonModule,
    TagModule

  ]
})
export class SearchMaterialsModule { }
