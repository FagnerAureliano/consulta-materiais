import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ContentService } from 'projects/consult-materials/src/app/services/content.service';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit, OnChanges {
  questions: any;
  scopes: any;

  displayDialog: boolean = false;
  displayDialogDetail: boolean = false;

  faqToEdit: any;
  table = true;

  htmlElement = document.documentElement;

  constructor(
    private cdref: ChangeDetectorRef,
    private sharedDataService: SharedDataService,
    private faqService: ContentService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.table = false;
    this.sharedDataService.questions$.subscribe((data) => {
      this.questions = data;
      this.table = true;
      this.displayDialog = false;
    });
  }

  update(data) {
    this.table = false;
    this.faqService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.table = true;
      this.displayDialog = false;
    });
  }
  ngOnInit(): void {
    this.sharedDataService.questions$.subscribe((data) => {
      this.questions = data;
    });

    this.sharedDataService.scopes$.subscribe((data) => {
      this.scopes = data;
    });
  }

  showFaqDialog(faqData?: any): void {
    this.faqToEdit = faqData;

    this.displayDialog = true;
  }

  showDetails(question: any) {
    this.faqToEdit = question;
    this.displayDialogDetail = true;
  }

  editQuestion(question: any) {
    console.log('editQuestion');
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  onShow(isOpen: boolean): void {
    isOpen
      ? (this.htmlElement.style.overflow = 'hidden')
      : (this.htmlElement.style.overflow = '');
  }
}
