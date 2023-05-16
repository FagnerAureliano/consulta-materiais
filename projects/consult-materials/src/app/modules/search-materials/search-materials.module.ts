import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';



import { SearchMaterialsRoutingModule } from './search-materials-routing.module';
import { SearchContainerComponent } from './containers/search-container/search-container.component';
import { LoadingBarModule } from 'projects/shared/src/lib/components/loading-bar/loading-bar.module';
import { MaterialCardsComponent } from './components/material-card/material-card.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { DialogModule } from 'primeng/dialog';



registerLocaleData(localePt);
@NgModule({
  declarations: [
    SearchContainerComponent,
    MaterialCardsComponent,
    MaterialDetailComponent
  ],
  imports: [
    CommonModule,
    SearchMaterialsRoutingModule,
    LoadingBarModule,
    CardModule,
    ButtonModule,
    TagModule,
    DividerModule,
    DialogModule

  ],
 providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }    
  ]  
})
export class SearchMaterialsModule { }
