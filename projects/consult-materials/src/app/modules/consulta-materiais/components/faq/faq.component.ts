import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  questions: any;
  scopes: any;

  displayDialog: boolean = false;

  faqToEdit: any;

  htmlElement = document.documentElement; 

  constructor(
    private cdref: ChangeDetectorRef,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.questions$.subscribe(data => {
      this.questions = data;
    });

    this.sharedDataService.scopes$.subscribe(data => {
      this.scopes = data;
    });
  }

  showFaqDialog(faqData?: any): void {
    this.faqToEdit = faqData;

    this.displayDialog = true;
  }

  showDetails(question: any) {
    console.log('showDetails');
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
