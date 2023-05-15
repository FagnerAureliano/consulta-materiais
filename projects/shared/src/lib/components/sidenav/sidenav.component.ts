import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'shrd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  _isHidden = true;

  @Input() basePath: string = '';

  constructor() {}

  ngOnInit(): void {}

  toggleNav() {
    this._isHidden = !this._isHidden;
  }
}
