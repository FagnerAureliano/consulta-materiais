import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { UserService } from '@shared';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss'],
})
export class MoviesContainerComponent implements OnInit {
  private subs$: Subscription[] = [];

  actualScope: string;
  _scopes: Scopes[];
  materials: any;
  videos = [
    'https://www.youtube.com/embed/XDrB5c4-c9Y',
    'https://www.youtube.com/embed/XDrB5c4-c9Y',
    'https://www.youtube.com/embed/XDrB5c4-c9Y',
    'https://www.youtube.com/embed/XDrB5c4-c9Y',
    'https://www.youtube.com/embed/XDrB5c4-c9Y',
  ];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private searchService: SearchMaterialsService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.actualScope = localStorage.getItem('actualScope');
    this.searchService
      .getEntrypointSearch(
        {
          searchText: 'teste',
          primaryType: 'Video',
          scopePath: '/PORTALDEAPOIO/workspaces/apoio-workspace-geral',
        },
        0,
        20,
        null
      )
      .subscribe((res) => {
        this.materials = res;
        console.log(this.materials.entries);
      });
  }
  ngOnDestroy(): void {
    this.subs$.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.updateActualScope();
  }

  private subscribeToRouterEvents(): void {
    const routerEventSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateActualScope());

    this.subs$.push(routerEventSub);
  }

  private updateActualScope(): void {
    this.actualScope = localStorage.getItem('actualScope');
  }
}
