import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { HelpComponent } from './help/help.component';
import { HelpRoutingModule } from './help-routing.module';

const PRIME_COMPONENTS = [ 
  CardModule, 
];

@NgModule({
  declarations: [
    HelpComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    
    PRIME_COMPONENTS
  ]
})
export class HelpModule { }
