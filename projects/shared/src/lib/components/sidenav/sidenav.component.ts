import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HasContentService } from '../../services/has-content.service';

@Component({
  selector: 'shrd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  _isHidden = true;

  @Input() basePath: string = '';

  constructor(private hasContent: HasContentService) {}

  ngOnInit(): void {
    this.hasContent.getActive().subscribe(hasContent =>{
      this._isHidden = hasContent
    })
  }

  toggleNav() {
    this._isHidden = !this._isHidden;
  }
}
