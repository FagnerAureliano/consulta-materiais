import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'consulta-materiais';
  basePath!: 'aaa';
  _basePath!: 'ss';

  handleUrlEmitEvent(props: any) {
    console.log(props);
  }
  handle(test: any) {
    console.log(test);
  }
}
