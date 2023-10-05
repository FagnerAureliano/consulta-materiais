import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role, UserService } from '@shared';
import { Question } from 'projects/consult-materials/src/app/models/question.models';
import { Tag } from 'projects/consult-materials/src/app/models/search.models';

@Component({
  selector: 'app-faq-detail',
  templateUrl: './faq-detail.component.html',
  styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent implements OnInit {
  @Output() tagEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() removeEmitter = new EventEmitter();
  @Output() questionViewEmitter = new EventEmitter();
  @Input() question: Question;
  @Input() isActionBtnDisabled: boolean;
  @Input() hasPermission: boolean; // ADMIN OR MANAGER

  constructor() {}

  ngOnInit(): void {}

  handleEdit(question: Question): void {
    this.editEmitter.emit(question);
  }
  handleRemove(question: Question): void {
    this.removeEmitter.emit(question);
  }
  handleSearchByTags(tag: Tag): void {
    this.tagEmitter.emit(tag.label);
  }
  onQuestionView(question: Question): void {
    this.questionViewEmitter.emit(question.id);
  }
}
