import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { SearchBoxService } from 'projects/shared/src/lib/services/searchbox.service';
import { getFileTypeByMIME } from 'projects/shared/src/lib/utils/file-types';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './consulta-container.component.html',
  styleUrls: ['./consulta-container.component.scss'],
})
export class ConsultaContainerComponent implements OnInit {
  randomDate(startYear: number, endYear: number) {
    const startDate = new Date(startYear, 0, 1).getTime();
    const endDate = new Date(endYear, 11, 31).getTime();
    const randomTimestamp = startDate + Math.random() * (endDate - startDate);
    return new Date(randomTimestamp);
  }
  handleClickTag(value: any): void {
    console.log(value);
  }
  searchObject: any[] = [];
  listSearch: any[] = [];
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
    private searchBoxService: SearchBoxService
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.searchBoxService.inputChange$
      // .pipe(
      //   tap((res) => this.loading.start()),
      //   delay(1000)
      // )
      .subscribe((value) => {
        console.log(value);

        // this.loading.end();
        // Faça algo com o valor do input recebido
      });
  }

  loadItems(): void {
    if (this._loading) {
      return;
    }
    this._loading = true;

    this.consultaService
      .getAll(this.startIndex, this.itemsPerPage)
      .pipe(finalize(() => console.log(this.searchObject)))
      .subscribe((items: any) => {
        this.listSearch = items
        this.isEmpty = items.length > 0 ? false : true;

        const mappedItems = items.entries.map((value) => ({
          title: value.properties['dc:title'],
          description: value.properties['dc:description'],
          types: [
            {
              name: getFileTypeByMIME(value.properties['file:content']['mime-type']),
            },
            { name: 'Guia Rápido' },
          ],
          tags: value.properties['nxtag:tags'],

          urlMedia: {
            thumbnail: value.properties['thumb:thumbnail'].data,
            content: value.properties['file:content'].data,
            name: value.properties['file:content'].name,
          },
          lastModified: value.properties['dc:modified'],
        }));

        // this.removeOldItems();
        this.searchObject = [...this.searchObject, ...mappedItems];
        this.searchObject = [...this.searchObject, ...mappedItems];
        this.searchObject = [...this.searchObject, ...mappedItems];
        this.searchObject = [...this.searchObject, ...mappedItems];

        this.startIndex += this.itemsPerPage;
        this._loading = false;
      });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const bottomOffset = scrollHeight - (scrollTop + windowHeight);

    if (bottomOffset <= 100) {
      this.loadItems();
    }
  }

  removeOldItems() {
    const maxItems = 100; // Maximum number of items to keep in the list

    if (this.searchObject.length >= maxItems) {
      const removeCount = this.searchObject.length - maxItems;
      this.searchObject.splice(0, removeCount);
    }
  }
}
