import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from 'projects/shared/src/lib/services/loading-bar.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private loading: LoadingBarService) { }

  ngOnInit(): void {
    // this.loading.start()
  }

}
