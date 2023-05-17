import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss'],
})
export class MaterialDetailComponent implements OnInit {
  visible: boolean;

  search =[
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
    }
  ]
  constructor() {}

  ngOnInit(): void {}
  showDialog() {
    this.visible = true;
  }

  randomDate(startYear: number, endYear: number) {
    const startDate = new Date(startYear, 0, 1).getTime();
    const endDate = new Date(endYear, 11, 31).getTime();
    const randomTimestamp = startDate + Math.random() * (endDate - startDate);
    return new Date(randomTimestamp);
  }
}
