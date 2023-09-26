import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenu } from 'primeng/tabmenu';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit {
  private subs$: Subscription[] = [];
  activeIndex: number = 0;

  _breadcrumbItems: MenuItem[];
  _tabMenuItems: MenuItem[];
  _home: MenuItem;
  _activatedRoute = false;
  _activeTabMenuItem: MenuItem;
  atualScope: any;
  public questions: any;
  public scopes: any;

  @ViewChild('tabMenuItem') private _tabMenu: TabMenu;

  constructor(
    private hasContent: HasContentService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    sharedDataService.actualScope$.subscribe((scope) => {
      console.log(scope);
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // O código a seguir será executado sempre que a rota mudar
        console.log('Rota mudou');
      });

    this.activatedRoute.params.subscribe((params) => {
      // O código a seguir será executado sempre que os parâmetros de rota mudarem
      console.log('Parâmetros de rota mudaram:', params);
    });

    // this.sharedDataService.setQuestions(this.questions);

    // const activeChildRoute = this.route.snapshot.firstChild;

    // if (activeChildRoute?.url.length) {
    //   const activePath = activeChildRoute.url[0].path;

    //   this.activeIndex = activePath === 'faq' ? 0 : 1;
    // }

    this.hasContent.setActive(true);

    this._tabMenuItems = [
      {
        label: 'Perguntas Frequentes',
        routerLink: [`/assistance/content/null/faq`],
      },
      {
        label: 'Manuais',
        routerLink: [`/assistance/content/null/manuais`],
        // disabled: true,
      },
      {
        label: 'Video Aulas',
        routerLink: [``],
        disabled: true,
      },
      {
        label: 'Guias Rápido',
        routerLink: [``],
        disabled: true,
      },
    ];

    this._activeTabMenuItem = this._tabMenuItems.filter((tabMenuItem) =>
      tabMenuItem.routerLink?.includes(this.router.url)
    )[0];

    this.subs$.push(
      this.router.events.subscribe((e) => {
        if (e instanceof NavigationEnd) {
          for (const tabMenuItem of this._tabMenuItems) {
            tabMenuItem.disabled = false;
          }
        }
      })
    );
  }

  handleChange(event) {
    // const index = event.index;
    // let path: string;
    // if (index === 0) {
    //   path = 'faq';
    // } else if (index === 1) {
    //   path = 'other'
    // }
    // this.router.navigate([path], {relativeTo: this.route});
  }
  handleMenuClick() {
    if (this._activeTabMenuItem !== this._tabMenu.activeItem) {
      this._activeTabMenuItem = this._tabMenu.activeItem;

      for (const tabMenuItem of this._tabMenuItems) {
        tabMenuItem.disabled = false;
      }
    }
  }
}
