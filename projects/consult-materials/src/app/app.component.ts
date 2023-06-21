import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'consulta-materiais';
  _basePath = environment.SEARCH_FRONT_URL + 'materials/search';

  handleUrlEmitEvent(props: any) {
    console.log(props);
  }
}
