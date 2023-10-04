import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-material-cards',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardsComponent implements OnInit {
  @Input() document!: any;
  @Input() isActionBtnDisabled: boolean = false;
  @Output() tagEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleDelete(): void {
    this.deleteEmitter.emit(this.document.id);
  }

  handleUpdate(): void {
    this.updateEmitter.emit(this.document);
  }

  handleTagSearch(tag: string): void {
    this.tagEmitter.emit(tag);
  }
}
