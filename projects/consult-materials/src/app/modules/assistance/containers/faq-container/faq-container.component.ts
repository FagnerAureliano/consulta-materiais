import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { ContentService } from 'projects/consult-materials/src/app/services/content.service';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss'],
})
export class FaqContainerComponent implements OnInit, OnChanges {
  private subs$: Subscription[] = [];

  questions: any;
  scopes: Scopes[];

  displayDialog: boolean = false;
  displayDialogDetail: boolean = false;

  faqToEdit: any;
  table = true;

  htmlElement = document.documentElement;

  constructor(
    private cdref: ChangeDetectorRef,
    private sharedDataService: SharedDataService,
    private faqService: ContentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subs$.push(
      this.route.data.subscribe((res) => { 
        this.questions = res.data.questions;  
        sharedDataService.setScopes(res.data.scopes);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.table = false;
    // this.sharedDataService.questions$.subscribe((data) => {
    //   this.questions = data;
    //   this.table = true;
    //   this.displayDialog = false;
    // });
  }

  update(data) {
    // this.table = false;
    // this.faqService.getQuestions().subscribe((data) => {
    //   this.questions = data;
    //   this.table = true;
    //   this.displayDialog = false;
    // });
  }
  ngOnInit(): void {
    // this.sharedDataService.questions$.subscribe((data) => {
    //   this.questions = data;
    // });

    // this.sharedDataService.scopes$.subscribe((data) => {
    //   this.scopes = data;
    // }); 
    
  }

  showFaqDialog(faqData?: any): void {
    this.router.navigate(['assistance/content/faq/cadastro']);
    // this.faqToEdit = faqData;

    // this.displayDialog = true;
  }

  showDetails(question: any) {
    this.faqToEdit = question;
    this.displayDialogDetail = true;
  }

  editQuestion(question: any) {
    console.log('editQuestion');
  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }
  onShow(isOpen: boolean): void {
    isOpen
      ? (this.htmlElement.style.overflow = 'hidden')
      : (this.htmlElement.style.overflow = '');
  }
}
