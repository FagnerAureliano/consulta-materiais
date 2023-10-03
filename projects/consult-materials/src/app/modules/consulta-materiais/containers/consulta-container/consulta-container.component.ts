import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SearchObjectParams } from 'projects/consult-materials/src/app/models/search-object-params';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';
import { ClearService } from 'projects/shared/src/lib/services/clear.service';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';
import { MaterialFilterService } from 'projects/shared/src/lib/services/material-filter.service';
import { Observable, Subscription, forkJoin, of, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './consulta-container.component.html',
  styleUrls: ['./consulta-container.component.scss'],
})
export class ConsultaContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  content$: Observable<boolean> = this.hasContent.getActive();

  searchObject: any[] = [];

  filterParam: SearchObjectParams;

  itemsPerPage = 6;
  startIndex = 0;

  _isActionBtnDisabled: boolean = false;

  _loading = false;

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

  isEmpty = true;

  htmlElement = document.documentElement;

  constructor(
    private searchService: SearchMaterialsService,
    private streamService: StreamMaterialsService,
    private confirmationService: ConfirmationService,
    private clearService: ClearService,
    private filterService: MaterialFilterService,
    private hasContent: HasContentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
    this.subs$.forEach((sub$) => sub$.unsubscribe());
  }

  ngOnInit(): void {
    this.clearService.clear$.subscribe(() => {
      this.searchObject = [];
    });

    const queryParam = this.route.snapshot.queryParams.q;

    if (queryParam) {
      const searchObject: SearchObjectParams = {
        searchText: queryParam,
        primaryType: null,
      };

      this.loadItems(searchObject);
    }

    this.filterService.inputChange$.subscribe((value) => {
      if (value) {
        this.searchObject = [];
        this.startIndex = 0;
      }

      this.loadItems(value);
    });

    this.hasContent.setActive(false);
  }

  loadItems(params: SearchObjectParams): void {
    if (params) {
      this.filterParam = params;

      if (params !== this.filterParam) {
        this.startIndex = 0;
      }
    }

    if (this._loading) {
      return; // Carregamento em andamento, retornar sem fazer nada
    }

    this._loading = true;

    this.subs$.push(
      this.searchService
        .getEntrypointSearch(params, this.startIndex, this.itemsPerPage)
        .pipe(
          switchMap((items: any) =>
            forkJoin(
              items.entries.map((value: { id: string }) =>
                this.getThumbnailWithFallback(value)
              )
            )
          ),
          finalize(() => {
            this._loading = false;

            this.hasContent.setActive(
              this.searchObject.length > 0 ? true : false
            );
          })
        )
        .subscribe((mappedItems) => {
          this.searchObject = [...this.searchObject, ...mappedItems];
          this.startIndex = this.startIndex + 1;
          this.isEmpty = mappedItems.length > 0 ? false : true;
        })
    );
  }

  getThumbnailWithFallback(value: { id: string }) {
    return this.streamService.getThumbnail(value['id']).pipe(
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

      this.loadItems(value.label);
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
        this.subs$.push(
          this.streamService
            .deleteDocument(id)
            .pipe(
              catchError((err) => {
                this.setActionButtonState(false);
                return throwError(err);
              })
            )
            .subscribe(() => {
              this.setActionButtonState(false);
              this.handleDeleteSuccess(id);
            })
        );
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
