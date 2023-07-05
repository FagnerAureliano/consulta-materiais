import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { getFileTypeByMIME } from 'projects/shared/src/lib/utils/file-types';
import { of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss'],
})
export class MaterialDetailComponent implements OnInit {
  visible: boolean;
  @Input() documentId: any;
  document: any;
  viewDialog = { width: '60vw', height: '90vh' };
  constructor(
    private service: ConsultaMateriaisService,
    private sanitizer: DomSanitizer
  ) {}
  fileURL: any;
  ngOnInit(): void {}
  showDialog() {
    this.service
      .getDocumentByID(this.documentId)
      .pipe(
        tap((res: any) => {
          this.service.getDocumentFile(res.id).subscribe((file: any) => {
            console.log(file);

            const blob = new Blob([file], {
              type: 'application/pdf',
            });
            const url = window.URL.createObjectURL(blob);
            this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            console.log(this.fileURL);
          });
        }),
        catchError(() => of(null)),
        finalize(() => {
          this.visible = true;
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  convertObject(value: any, thumbnail: any) {
    let mimeType: string;
    let content: any;
    let name: any;
    const types = [];
    switch (value.type) {
      case 'File':
        mimeType = value.properties['file:content']['mime-type'];
        content = value.properties['file:content'].data;
        name = value.properties['file:content'].name;

        for (const tag of value.properties['dc:contributors']) {
          types.push({ name: tag });
        }
        types.push({ name: getFileTypeByMIME(mimeType) });

        return {
          id: value.id,
          title: value.properties['dc:title'],
          description: value.properties['dc:description'],
          types,
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
        for (const tag of value.properties['dc:contributors']) {
          types.push({ name: tag });
        }
        types.push({ name: getFileTypeByMIME(mimeType) });

        return {
          id: value.id,
          title: value.title,
          description: value.properties['dc:description'],
          types,
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
