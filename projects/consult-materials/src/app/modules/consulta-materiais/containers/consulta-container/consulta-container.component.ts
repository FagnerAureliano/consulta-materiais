import { Component, HostListener, OnInit } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { LoadingBarService } from 'projects/shared/src/lib/services/loading-bar.service';
import { SearchBoxService } from 'projects/shared/src/lib/services/searchbox.service';
import { delay, map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './consulta-container.component.html',
  styleUrls: ['./consulta-container.component.scss'],
})
export class ConsultaContainerComponent implements OnInit {
  [x: string]: any;
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
  itemsPerPage = 6;
  startIndex = 0;

  // searchObject = [
  //   {
  //     title: 'Tecnologia da Informação',
  //     tags: [
  //       {
  //         name: 'tecnologia',
  //       },
  //       {
  //         name: 'inovação',
  //       },
  //     ],
  //     description:
  //       'Artigo sobre inteligência artificial e aprendizado de máquina.Artigo sobre inteligência artificial e aprendizado de máquina.Artigo sobre inteligência artificial e aprendizado de máquina.',
  //     urlMedia: {
  //       url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
  //       thumbnail:
  //         'https://www.saobernardo.sp.gov.br/documents/640736/1366558/47.+Audi%C3%AAncia+P%C3%BAblica+de+Elabora%C3%A7%C3%A3o+da+LOA+2022.pdf/036fe11d-b0ec-8afe-25ed-4ebe4b458188?version=1.4&previewFileIndex=2',
  //     },
  //     lastModified: this.randomDate(2021, 2023),
  //   },
  //   {
  //     title: 'Marketing e Business',
  //     tags: [
  //       {
  //         name: 'marketing',
  //       },
  //       {
  //         name: 'vendas',
  //       },
  //       {
  //         name: 'negócios',
  //       },
  //     ],
  //     description:
  //       'White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.',
  //     urlMedia: {
  //       url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
  //       thumbnail:
  //         'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
  //     },
  //     lastModified: this.randomDate(2021, 2023),
  //   },
  //   {
  //     title: 'Moda e Estilo',
  //     tags: [
  //       {
  //         name: 'moda',
  //       },
  //       {
  //         name: 'beleza',
  //       },
  //       {
  //         name: 'estilo',
  //       },
  //     ],
  //     description:
  //       'Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.',
  //     urlMedia: {
  //       url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
  //       thumbnail:
  //         'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
  //     },
  //     lastModified: this.randomDate(2021, 2023),
  //   },
  //   {
  //     title: 'Ciência e Medicina',
  //     tags: [
  //       {
  //         name: 'ciência',
  //       },
  //       {
  //         name: 'saúde',
  //       },
  //       {
  //         name: 'pesquisa',
  //       },
  //     ],
  //     description:
  //       'Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.',
  //     urlMedia: {
  //       url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
  //       thumbnail:
  //         'https://www.saobernardo.sp.gov.br/documents/640736/1366558/47.+Audi%C3%AAncia+P%C3%BAblica+de+Elabora%C3%A7%C3%A3o+da+LOA+2022.pdf/036fe11d-b0ec-8afe-25ed-4ebe4b458188?version=1.4&previewFileIndex=2',
  //     },
  //     lastModified: this.randomDate(2021, 2023),
  //   },
  // ];
  _loading = false;
  items: MenuItem[];

  constructor(
    private loading: LoadingBarService,
    private searchBoxService: SearchBoxService
  ) {}

  ngOnInit(): void {
    this.searchBoxService.inputChange$
      .pipe(
        tap((res) => this.loading.start()),
        delay(1000)
      )
      .subscribe((value) => {
        console.log('Input changed:', value[0]);
        this.loading.end();
        // Faça algo com o valor do input recebido
      });
    this.loadItems();

    this.items = [
      { label: 'Documentos', icon: 'pi pi-fw pi-file' },
      {
        label: 'Guia Rápido',
        icon: 'pi pi-fw pi-directions',
        routerLink: '/materials/guia-cadastro',
      },
      { label: 'Perguntas Frequentes', icon: 'pi pi-fw pi-question-circle' },
    ];
  }

  loadItems(): void {
    if (this._loading) {
      return;
    }

    const url = `https://jsonplaceholder.typicode.com/photos?_start=${this.startIndex}&_limit=${this.itemsPerPage}`;

    this._loading = true;
    this.loading.start();
    setTimeout(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const mappedItems = json.map((value) => ({
            title: value.title,
            description: value.title.repeat(3),
            types: [{ name: 'PDF' }, { name: 'Guia Rápido' }],
            tags: [
              { name: value.title.slice(0, 6) },
              { name: value.title.slice(7, 13) },
            ],
            urlMedia: {
              thumbnail: value.url,
            },
            lastModified: this.randomDate(2020, 2023),
          }));

          // this.removeOldItems();
          this.searchObject = [...this.searchObject, ...mappedItems];
          this.startIndex += this.itemsPerPage;
          this._loading = false;
        });
      this.loading.end();
    }, Math.floor(Math.random() * (2000 - 500) + 500));
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
