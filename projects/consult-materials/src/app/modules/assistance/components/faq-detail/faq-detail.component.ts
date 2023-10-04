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
  @Output() removeEmitter = new EventEmitter();
  @Output() questionViewEmitter = new EventEmitter();
  @Input() question: Question;
  @Input() isActionBtnDisabled: boolean;

  isAdmin: boolean;

  constructor(private router: Router, private userService: UserService) {
    this.isAdmin = userService.user.roles.includes(Role.ADMIN);
  }

  ngOnInit(): void {}

  handleEdit(question: Question): void {
    this.router.navigate([`/assistance/content/faq/update/${question.id}`]);
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
