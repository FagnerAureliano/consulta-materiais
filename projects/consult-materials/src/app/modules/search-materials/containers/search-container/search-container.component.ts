import { Component, HostListener, OnInit } from '@angular/core';
import { LoadingBarService } from 'projects/shared/src/lib/services/loading-bar.service';
import { SearchBoxService } from 'projects/shared/src/lib/services/searchbox.service';
import { delay, map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.scss'],
})
export class SearchContainerComponent implements OnInit {
  randomDate(startYear: number, endYear: number) {
    const startDate = new Date(startYear, 0, 1).getTime();
    const endDate = new Date(endYear, 11, 31).getTime();
    const randomTimestamp = startDate + Math.random() * (endDate - startDate);
    return new Date(randomTimestamp);
  }
  handleClickTag(value: any): void {
    console.log(value);
  }

  searchObject = [
    {
      title: 'Tecnologia da Informação',
      tags: [
        {
          name: 'tecnologia',
        },
        {
          name: 'inovação',
        },
      ],
      description:
        'Artigo sobre inteligência artificial e aprendizado de máquina.Artigo sobre inteligência artificial e aprendizado de máquina.Artigo sobre inteligência artificial e aprendizado de máquina.',
      urlMedia: {
        url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        thumbnail:
          'https://www.saobernardo.sp.gov.br/documents/640736/1366558/47.+Audi%C3%AAncia+P%C3%BAblica+de+Elabora%C3%A7%C3%A3o+da+LOA+2022.pdf/036fe11d-b0ec-8afe-25ed-4ebe4b458188?version=1.4&previewFileIndex=2',
      },
      lastModified: this.randomDate(2021, 2023),
    },
    {
      title: 'Marketing e Business',
      tags: [
        {
          name: 'marketing',
        },
        {
          name: 'vendas',
        },
        {
          name: 'negócios',
        },
      ],
      description:
        'White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.White paper sobre estratégias de vendas online.',
      urlMedia: {
        url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        thumbnail:
          'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
      },
      lastModified: this.randomDate(2021, 2023),
    },
    {
      title: 'Moda e Estilo',
      tags: [
        {
          name: 'moda',
        },
        {
          name: 'beleza',
        },
        {
          name: 'estilo',
        },
      ],
      description:
        'Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.Revista digital de moda e beleza com dicas e tendências.',
      urlMedia: {
        url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        thumbnail:
          'https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png',
      },
      lastModified: this.randomDate(2021, 2023),
    },
    {
      title: 'Ciência e Medicina',
      tags: [
        {
          name: 'ciência',
        },
        {
          name: 'saúde',
        },
        {
          name: 'pesquisa',
        },
      ],
      description:
        'Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.Relatório de pesquisa sobre a vacinação contra a COVID-19.',
      urlMedia: {
        url: 'https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf',
        thumbnail:
          'https://www.saobernardo.sp.gov.br/documents/640736/1366558/47.+Audi%C3%AAncia+P%C3%BAblica+de+Elabora%C3%A7%C3%A3o+da+LOA+2022.pdf/036fe11d-b0ec-8afe-25ed-4ebe4b458188?version=1.4&previewFileIndex=2',
      },
      lastModified: this.randomDate(2021, 2023),
    },
  ];

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
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(_event: Event) {
    // console.log(_event);
  }
}
