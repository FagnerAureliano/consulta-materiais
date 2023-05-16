import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() search!: any;
  @Output() emitTag: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.search.description = this.truncateString(this.search.description, 150)
    
  }
  truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }


}
