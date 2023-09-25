import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent implements OnInit {
  @Input() question: string;
  @Input() answer: string;

  showAnswer = false;

  toggleAnswer() {
    this.showAnswer = !this.showAnswer;
  }
  constructor() {}

  ngOnInit(): void {}
}
