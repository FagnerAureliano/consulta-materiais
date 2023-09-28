import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent implements OnInit {
  @Input() question: any;
  @Input() isActionBtnDisabled: boolean;
  @Output() removeEmmitter = new EventEmitter();
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleEditQuestion(question) {
    this.router.navigate([`/assistance/content/faq/update/${question.id}`]);
  }
  onRemove(question) {
    this.removeEmmitter.emit(question)
  }
}
