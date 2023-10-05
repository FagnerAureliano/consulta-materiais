import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, forkJoin, of, throwError } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

import { ClearService } from 'projects/shared/src/lib/services/clear.service';
import { SearchObjectParams } from 'projects/shared/src/lib/models/search-object-params';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';
import { MaterialFilterService } from 'projects/shared/src/lib/services/material-filter.service';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';
import { Role, UserService } from '@shared';

@Component({
  selector: 'app-search-container',
  templateUrl: './consulta-container.component.html',
  styleUrls: ['./consulta-container.component.scss'],
})
export class ConsultaContainerComponent implements OnInit, OnDestroy {
  private _subs$ = new Subject();

  startIndex: number = 0;
  isEmpty: boolean = true;
  itemsPerPage: number = 6;
  searchObject: any[] = [];
  filterParam: SearchObjectParams;
  htmlElement: HTMLElement = document.documentElement;
  content$: Observable<boolean> = this.hasContent.getActive();

  _loading: boolean = false;
  _isActionBtnDisabled: boolean = false;

  items: MenuItem[] = [
    {
      label: 'Documentos',
      icon: 'pi pi-fw pi-file',
      routerLink: '/materials/documento-cadastro',
    },
    {
      label: 'Guia Rápido',
      icon: 'pi pi-fw pi-directions',
      routerLink: '/materials/guia-cadastro',
    },
  ];
  _hasPermission: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private clearService: ClearService,
    private hasContent: HasContentService,
    private messageService: MessageService,
    private filterService: MaterialFilterService,
    private searchService: SearchMaterialsService,
    private streamService: StreamMaterialsService,
    private confirmationService: ConfirmationService
  ) {
    this._hasPermission =
      userService.user.roles.includes(Role.ADMIN) ||
      userService.user.roles.includes(Role.MANAGER);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const bottomOffset = scrollHeight - (scrollTop + windowHeight);

    if (bottomOffset <= 100) {
      this.loadItems(this.filterParam);
    }
  }

  ngOnDestroy(): void {
    this._subs$.next();
    this._subs$.complete();
  }

  ngOnInit(): void {
    this.clearService.clear$
      .pipe(takeUntil(this._subs$))
      .subscribe(() => this.clearSearch());

    const queryParam = this.route.snapshot.queryParams.q;

    if (queryParam) {
      const searchObject: SearchObjectParams = {
        searchText: queryParam,
        primaryType: null,
      };
      this.loadAndDisplayItems(searchObject);
    }

    this.filterService.inputChange$
      .pipe(takeUntil(this._subs$))
      .subscribe((value) => {
        if (value) {
          this.clearSearch();
        }
        this.loadAndDisplayItems(value);
      });

    this.hasContent.setActive(false);
  }

  private clearSearch(): void {
    this.startIndex = 0;
    this.searchObject = [];
  }

  private loadAndDisplayItems(params: SearchObjectParams): void {
    this.clearSearch();
    this.loadItems(params);
  }

  loadItems(params: SearchObjectParams): void {
    if (this._loading) {
      return; // Carregamento em andamento, retornar sem fazer nada
    }

    this._loading = true;

    const filterParam =
      typeof params === 'string'
        ? { searchText: params, primaryType: null, scopePath: null }
        : params;

    if (filterParam !== this.filterParam) {
      this.startIndex = 0;
    }

    this.filterParam = filterParam;

    this.searchService
      .getEntrypointSearch(
        this.filterParam,
        this.startIndex,
        this.itemsPerPage,
        filterParam.scopePath
      )
      .pipe(
        takeUntil(this._subs$),
        switchMap((items: any) =>
          forkJoin(
            items.entries.map((value: { id: string }) =>
              this.getThumbnailWithFallback(value)
            )
          )
        ),
        finalize(() => {
          this._loading = false;
          this.hasContent.setActive(this.searchObject.length > 0);
        })
      )
      .subscribe((mappedItems) => {
        this.searchObject = [...this.searchObject, ...mappedItems];
        this.startIndex++;
        this.isEmpty = mappedItems.length === 0;
      });
  }

  getThumbnailWithFallback(value: { id: string }) {
    return this.streamService.getThumbnail(value['id']).pipe(
      takeUntil(this._subs$),
      catchError(() => of(null)),
      map((thumbnail: any) => {
        const thumbnailBase64 =
          thumbnail && thumbnail.thumbnailBase64
            ? `data:image/png;base64,${thumbnail.thumbnailBase64}`
            : '';
        return { ...value, thumbnail: thumbnailBase64 };
      })
    );
  }

  handleClickTag(value: any): void {
    if (value) {
      this.searchObject = [];
      this.startIndex = 0;
      this.loadItems(value);
    }
  }

  updateDocument(data: any): void {
    const { id, type } = data;
    const routePrefix =
      type === 'Note' ? 'guia-cadastro' : 'documento-cadastro';
    this.router.navigate([`/materials/${routePrefix}/edit/${id}`]);
  }

  deleteDocument(id: string): void {
    this.setActionButtonState(true);

    this.confirmationService.confirm({
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      target: event.target,
      message: 'Deseja realmente excluir este documento?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.streamService
          .deleteDocument(id)
          .pipe(
            takeUntil(this._subs$),
            catchError((err) => {
              this.setActionButtonState(false);
              return throwError(err);
            })
          )
          .subscribe(() => {
            this.setActionButtonState(false);
            this.handleDeleteSuccess(id);
          });
      },
      reject: () => {
        this.setActionButtonState(false);
      },
    });
  }

  private setActionButtonState(isDisabled: boolean): void {
    this._isActionBtnDisabled = isDisabled;
  }

  private handleDeleteSuccess(id: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Tudo OK',
      detail: 'Documento deletado com sucesso',
    });
    this.htmlElement.style.overflow = ''; // desbloqueia o scroller
    this.searchObject = this.searchObject.filter((objeto) => objeto.id !== id);
  }
}
