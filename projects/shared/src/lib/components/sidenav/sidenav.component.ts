import { Component, Input, OnInit } from '@angular/core';
import { HasContentService } from '../../services/has-content.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shrd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  _isHidden = true;

  @Input() basePath!: string;

  constructor(private router: Router, private hasContent: HasContentService) {}

  ngOnInit(): void {
    this.hasContent.getActive().subscribe((hasContent) => {
      this._isHidden = hasContent;
    });
  }

  toggleNav() {
    this._isHidden = !this._isHidden;
  }

  navigateToContent(scope: string) {
    this._isHidden = !this._isHidden;

    //Responsável por guardar o scopo atual utilizado no módulo FAQ
    localStorage.setItem('actualScope', scope);

    this.router.navigate([`/assistance/content/${scope}`]);
  }
}
