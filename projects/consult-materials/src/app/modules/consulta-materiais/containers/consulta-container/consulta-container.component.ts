import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { HasContentService } from 'projects/shared/src/lib/services/has-content.service';
import { SearchBoxService } from 'projects/shared/src/lib/services/searchbox.service';
import { getFileTypeByMIME } from 'projects/shared/src/lib/utils/file-types';
import { Observable, Subscription, forkJoin, of } from 'rxjs';
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
    private searchBoxService: SearchBoxService,
    private hasContent: HasContentService
  ) {}

  ngOnDestroy(): void {
    this.subs$.forEach((sub$) => sub$.unsubscribe());
  }

  ngOnInit(): void {
    this.searchBoxService.inputChange$
      .pipe(delay(700))
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value.length > 0) {
          this.searchObject = [];
          this.startIndex = 0;
        }
        this.loadItems(value[0]);
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
  handleClickTag(value: any): void {
    if (value) {
      this.searchObject = [];
      this.startIndex = 0;
      this.loadItems(value.label);
    }
  }

  removeOldItems() {
    const maxItems = 100; // Maximum number of items to keep in the list

    if (this.searchObject.length >= maxItems) {
      const removeCount = this.searchObject.length - maxItems;
      this.searchObject.splice(0, removeCount);
    }
  }

  convertObject(value: any, thumbnail: any) {
    let mimeType: string;
    let content: any;
    let name: any;
    switch (value.type) {
      case 'File':
        mimeType = value.properties['file:content']['mime-type'];
        content = value.properties['file:content'].data;
        name = value.properties['file:content'].name;

        return {
          id: value.id,
          title: value.properties['dc:title'],
          description: value.properties['dc:description'],
          types: [
            { name: getFileTypeByMIME(mimeType) },
            { name: 'Guia Rápido' },
          ],
          tags: value.properties['nxtag:tags'],
          urlMedia: {
            thumbnail: `data:image/png;base64,${thumbnail.thumbnailBase64}`,
            content,
            name,
          },
          lastModified: value.properties['dc:modified'],
        };
      case 'Note':
        mimeType = value.properties['note:mime_type'];
        content = value.properties['note:note'];
        name = value.properties['dc:title'];

        return {
          id: value.id,
          title: value.title,
          description: value.properties['dc:description'],
          types: [
            { name: getFileTypeByMIME(mimeType) },
            { name: 'Guia Rápido' },
          ],
          tags: value.properties['nxtag:tags'],
          urlMedia: {
            thumbnail: '',
            content,
            name,
          },
          lastModified: value.properties['dc:modified'],
        };
      default:
        return null;
    }
  }
}
