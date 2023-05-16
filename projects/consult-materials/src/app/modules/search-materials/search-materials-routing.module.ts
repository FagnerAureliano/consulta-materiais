import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchContainerComponent } from './containers/search-container/search-container.component';

const routes: Routes = [
  {
    path: '',
    component: SearchContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchMaterialsRoutingModule { }
