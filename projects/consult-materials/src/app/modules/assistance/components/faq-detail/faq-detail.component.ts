import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent implements OnInit {
  @Output() removeEmitter = new EventEmitter();
  @Output() tagEmitter = new EventEmitter();
  @Input() question: any;
  @Input() isActionBtnDisabled: boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleEditQuestion(question: { id: string }) {
    this.router.navigate([`/assistance/content/faq/update/${question.id}`]);
  }
  onRemove(question: any) {
    this.removeEmitter.emit(question);
  }
}
