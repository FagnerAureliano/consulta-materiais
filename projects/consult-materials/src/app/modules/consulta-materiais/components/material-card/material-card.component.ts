import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss'],
})
export class MaterialCardsComponent implements OnInit {
  @Input() search!: any;
  @Output() emitTag: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    // console.log(this.search);

    this.search.description = this.truncateString(this.search.description, 150);
  }
  truncateString(str: string, num: number) {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num) + '...';
  }
}
