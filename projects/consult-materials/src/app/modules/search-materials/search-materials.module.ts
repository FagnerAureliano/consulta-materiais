import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';



import { SearchMaterialsRoutingModule } from './search-materials-routing.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { CardsComponent } from './components/cards/cards.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';



registerLocaleData(localePt);
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
    TagModule,
    DividerModule

  ],
 providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }    
  ]  
})
export class SearchMaterialsModule { }
