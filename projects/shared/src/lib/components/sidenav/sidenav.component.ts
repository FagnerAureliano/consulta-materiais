import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HasContentService } from '../../services/has-content.service';
import { StreamSubjectService } from '../../services/stream-subject.service';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';

@Component({
  selector: 'shrd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() basePath!: string;

  _isHidden = true;
  scopos$ = this.streamSubjectService.scopes$;

  constructor(
    private router: Router,
    private hasContent: HasContentService,
    private streamSubjectService: StreamSubjectService
  ) {}

  ngOnInit(): void {
    this.hasContent.getActive().subscribe((hasContent) => {
      this._isHidden = hasContent;
    });
  }

  toggleNav() {
    this._isHidden = !this._isHidden;
  }

  navigateToContent({ scope }: Scopes) {
    this._isHidden = !this._isHidden;

    //Responsável por guardar o scopo atual utilizado no módulo FAQ
    localStorage.setItem('actualScope', scope);

    this.router.navigate([`/assistance/content/${scope}`]);
  }
}
