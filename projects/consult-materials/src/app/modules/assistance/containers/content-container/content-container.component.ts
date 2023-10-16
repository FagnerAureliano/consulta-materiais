import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FAQLinksService } from 'projects/shared/src/lib/services/faq-links.service';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
})
export class ContentContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  activeIndex: number = 0;

  _tabMenuItems: MenuItem[];
  _activeTabMenuItem: MenuItem;
  atualScope: any;

  constructor(
    private router: Router,
    private hasContent: HasContentService,
    private activatedRoute: ActivatedRoute,
    private faqLinksService: FAQLinksService
  ) {}

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.atualScope = params.scope;
      this.faqLinksService.setLinkUUID(null)
    });

    this.hasContent.setActive(true);

    this._tabMenuItems = [
      {
        label: 'Perguntas Frequentes',
        command: () => this.navigateTo('faq'),
      },
      {
        label: 'Video Aulas',
        command: () => this.navigateTo('video'),
        disabled: false,
      },
      {
        label: 'Guias Rápido',
        command: () => this.navigateTo('guide'),
        disabled: true,
      },
      {
        label: 'Manuais',
        command: () => this.navigateTo('manuais'),
        disabled: true,
      },
    ];
    this._activeTabMenuItem = this._tabMenuItems.find((tabMenu) =>
      this.router.url.includes(tabMenu.command.toString().split("'")[1])
    );
  }
  navigateTo(scope: string) {
    this.router.navigate([
      `/assistance/content/${
        this.atualScope ? this.atualScope : null
      }/${scope}`,
    ]);
  }
}
