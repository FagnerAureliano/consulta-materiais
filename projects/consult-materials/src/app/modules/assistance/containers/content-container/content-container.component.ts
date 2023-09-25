import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss']
})
export class ContentContainerComponent implements OnInit {

  activeIndex: number = 0;

  public questions: any;
  public scopes: any;
  

  constructor(
    private hasContent: HasContentService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService
  ) {
    const resolvedData = this.route.snapshot.data['data'];
    this.questions = resolvedData.questions;
    this.scopes = resolvedData.scopes;
   }

  ngOnInit(): void {
    this.sharedDataService.setQuestions(this.questions);
    this.sharedDataService.setScopes(this.scopes);

    const activeChildRoute = this.route.snapshot.firstChild;

    if (activeChildRoute?.url.length) {
      const activePath = activeChildRoute.url[0].path;

      this.activeIndex = activePath === 'faq' ? 0 : 1;
    }

    this.hasContent.setActive(true);
  }

  handleChange(event) {
    const index = event.index;
    let path: string;

    if (index === 0) {
      path = 'faq';
    } else if (index === 1) {
      path = 'other'
    }

    this.router.navigate([path], {relativeTo: this.route});
  }
}
