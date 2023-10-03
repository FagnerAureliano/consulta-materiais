import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'projects/consult-materials/src/app/models/search.models';

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

  handleEdit(question: { id: string }): void {
    this.router.navigate([`/assistance/content/faq/update/${question.id}`]);
  }
  handleRemove(question: any): void {
    this.removeEmitter.emit(question);
  }
  handleSearchByTags(tag: Tag): void {
    this.tagEmitter.emit(tag.label);
  }
}
