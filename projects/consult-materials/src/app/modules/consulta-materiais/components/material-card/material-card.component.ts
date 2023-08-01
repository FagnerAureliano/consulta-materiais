import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardsComponent {
  @Input() document!: any;
  @Input() isActionBtnDisabled: boolean = false;
  @Output() emitTag: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  handleDelete(): void {
    this.deleteEmitter.emit(this.document.id);
  }
  handleUpdate(): void {
    this.updateEmitter.emit(this.document);
  }
}
