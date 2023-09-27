import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'projects/shared/src/lib/services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss'],
})
export class FaqContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  questions: any;
  visibleTable = false;
  actualScope: string;

  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subs$.push(
      this.route.data.subscribe((res) => {
        this.questions = res.data.questions;
        this.visibleTable = this.questions.length > 0 ? true : false;
      })
    );
    this.subs$.push(
      this.sharedDataService.actualScope$.subscribe((res) => {
        this.actualScope = res;
      })
    );
  }
  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {}

  handleCreateFAQ(): void {
    this.router.navigate(['assistance/content/faq/create']);
  }
  handleRemoveQuestion(question) {
    console.log(question);
    
  }
}
