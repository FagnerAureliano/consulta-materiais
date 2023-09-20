import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  questions: any;

  displayDialog: boolean = false;

  faqToEdit: any;

  htmlElement = document.documentElement; 

  constructor(
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.sharedDataService.data$.subscribe(data => {
      this.questions = data;
    });

    console.log(this.questions);
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

  onShow(isOpen: boolean): void {
    isOpen
      ? (this.htmlElement.style.overflow = 'hidden')
      : (this.htmlElement.style.overflow = '');
  }
}
