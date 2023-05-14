import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from 'projects/shared/src/lib/services/loading-bar.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  searchObject = [
    {
      tags: [
        {
          name: "tecnologia"
        },
        {
          name: "inovação"
        }
      ],
      description: "Artigo sobre inteligência artificial e aprendizado de máquina.",
      urlMedia: {
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        thumbnail: "https://www.saobernardo.sp.gov.br/documents/640736/1366558/47.+Audi%C3%AAncia+P%C3%BAblica+de+Elabora%C3%A7%C3%A3o+da+LOA+2022.pdf/036fe11d-b0ec-8afe-25ed-4ebe4b458188?version=1.4&previewFileIndex=2"
      }
    },
    {
      tags: [
        {
          name: "marketing"
        },
        {
          name: "vendas"
        },
        {
          name: "negócios"
        }
      ],
      description: "White paper sobre estratégias de vendas online.",
      urlMedia: {
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        thumbnail: "https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png"
      }
    },
    {
      tags: [
        {
          name: "moda"
        },
        {
          name: "beleza"
        },
        {
          name: "estilo"
        }
      ],
      description: "Revista digital de moda e beleza com dicas e tendências.",
      urlMedia: {
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        thumbnail: "https://www.wyzowl.com/wp-content/uploads/2019/09/YouTube-thumbnail-size-guide-best-practices-top-examples.png"
      }
    },
    {
      tags: [
        {
          name: "ciência"
        },
        {
          name: "saúde"
        },
        {
          name: "pesquisa"
        }
      ],
      description: "Relatório de pesquisa sobre a vacinação contra a COVID-19.",
      urlMedia: {
        url: "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf",
        thumbnail: "https://www.saobernardo.sp.gov.br/documents/640736/1366558/47.+Audi%C3%AAncia+P%C3%BAblica+de+Elabora%C3%A7%C3%A3o+da+LOA+2022.pdf/036fe11d-b0ec-8afe-25ed-4ebe4b458188?version=1.4&previewFileIndex=2"
        
      }
    }
  ]

  constructor(private loading: LoadingBarService) { }

  ngOnInit(): void {
    // this.loading.start()
  }

  

}
