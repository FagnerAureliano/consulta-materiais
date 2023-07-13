import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardsComponent {
  @Input() search!: any;
  @Output() emitTag: EventEmitter<any> = new EventEmitter();
}
