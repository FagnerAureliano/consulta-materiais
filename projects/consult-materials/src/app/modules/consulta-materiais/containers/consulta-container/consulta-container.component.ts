import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';
import { MaterialFilterService } from 'projects/shared/src/lib/services/material-filter.service';
import { SearchBoxService } from 'projects/shared/src/lib/services/searchbox.service';
import { getFileTypeByMIME } from 'projects/shared/src/lib/utils/file-types';
import { Observable, Subscription, forkJoin, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  finalize,
  map,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './consulta-container.component.html',
  styleUrls: ['./consulta-container.component.scss'],
})
export class ConsultaContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  content$: Observable<boolean> = this.hasContent.getActive();

  searchObject: any[] = [];
  filterParam: string;
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
    {
      label: 'Perguntas Frequentes',
      icon: 'pi pi-fw pi-question-circle',
      styleClass: 'text-left',
    },
  ];

  isEmpty = true;

  constructor(
    private consultaService: ConsultaMateriaisService,
    private confirmationService: ConfirmationService,
    private filterContent: MaterialFilterService,
    private hasContent: HasContentService,
    private messageService: MessageService
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
    this.filterContent.inputChange$.subscribe((value) => {
      if (value) {
        this.searchObject = [];
        this.startIndex = 0;
      }
      this.loadItems(value.searchText);
    });
    this.hasContent.setActive(false);
  }

  loadItems(params: string): void {
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
      this.consultaService
        .getAll(params, this.startIndex, this.itemsPerPage)
        .pipe(
          switchMap((items: any) =>
            forkJoin(
              items.entries.map((value: { id: string }) =>
                this.consultaService.getThumbnail(value.id).pipe(
                  catchError(() => of(null)),
                  map((thumbnail: any) => {
                    return this.convertObject(value, thumbnail);
                  })
                )
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

  handleClickTag(value: any): void {
    if (value) {
      this.searchObject = [];
      this.startIndex = 0;
      this.loadItems(value.label);
    }
  }

  deleteDocument(id: any): void {
    this._isActionBtnDisabled = true;

    this.confirmationService.confirm({
      acceptLabel: 'Sim, deletar',
      rejectLabel: 'Cancelar',
      target: event.target,
      message:
        'Após deletado, não será possível recupera-lo. Tem certeza disso?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.subs$.push(
          this.consultaService
            .deleteDocument(id)
            .pipe(
              catchError((err) => {
                this._isActionBtnDisabled = false;
                return throwError(err);
              })
            )
            .subscribe(() => {
              this._isActionBtnDisabled = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Tudo OK',
                detail: 'Documento deletado com sucesso',
              });

              this.searchObject = this.searchObject.filter(
                (objeto) => objeto.id !== id
              );
            })
        );
      },
      reject: () => {
        this._isActionBtnDisabled = false;
      },
    });
  }

  convertObject(value: any, thumbnail: any) {
    switch (value.type) {
      case 'File':
        return {
          id: value.id,
          title: value.properties['dc:title'],
          description: value.properties['dc:description'],
          types: value.properties['fi:metadados'],
          tags: value.properties['nxtag:tags'],
          urlMedia: {
            thumbnail: `data:image/png;base64,${thumbnail.thumbnailBase64}`,
          },
          lastModified: value.properties['dc:modified'],
        };
      case 'Note':
        return {
          id: value.id,
          title: value.title,
          description: value.properties['dc:description'],
          types: value.properties['fi:metadados'],
          tags: value.properties['nxtag:tags'],
          urlMedia: {
            thumbnail: '',
          },
          lastModified: value.properties['dc:modified'],
        };
      default:
        return null;
    }
  }
}
