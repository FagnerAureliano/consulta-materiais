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

  @Input()basePath!: string;

  constructor(
    private hasContent: HasContentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.hasContent.getActive().subscribe(hasContent =>{
      this._isHidden = hasContent
    })
  }

  toggleNav() {
    this._isHidden = !this._isHidden;
  }

  navigateToContent(scope: string) {
    this._isHidden = !this._isHidden;

    // Get the current URL as an array of segments
    let urlSegments = this.router.url.split('/');

    // Find the index of the 'materials' segment
    const materialsIndex = urlSegments.findIndex(segment => segment === 'materials');

    // Construct the new URL segments array
    urlSegments = urlSegments.slice(0, materialsIndex + 1).concat(['content', scope]);

    // Navigate to the new URL
    this.router.navigate(urlSegments);
  }
}
