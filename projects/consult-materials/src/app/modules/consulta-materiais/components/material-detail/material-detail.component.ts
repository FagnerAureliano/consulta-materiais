import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { Material } from 'projects/consult-materials/src/app/models/search.models';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { getFileTypeByMIME } from 'projects/shared/src/lib/utils/file-types';
import { Subscription, of } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss'],
})
export class MaterialDetailComponent implements OnInit, OnDestroy {
  private _subs$: Subscription[] = [];
  @Input() documentId: any;
  
  visible: boolean;
  mimeType: string;
  data: SafeHtml;
  fileURL: SafeResourceUrl;
  material: Object;

  constructor(
    private service: ConsultaMateriaisService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    this._subs$.forEach((subs) => subs.unsubscribe());
  }

  ngOnInit(): void {}
  handleDownload(): void {
    console.log('tested download');
  }
  showDialog(): void {
    this._subs$.push(
      this.service
      .getDocumentByID(this.documentId)
      .pipe(
        tap((res: any) => {
          if (res.type != 'Note') {
            this.mimeType = res.properties['file:content']['mime-type'];
            this.service.getDocumentFile(res.id).subscribe((file: any) => {
              const blob = new Blob([file], {
                type: this.mimeType,
              });
              const url = window.URL.createObjectURL(blob);
              this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            });
          }
        }),
        catchError(() => of(null)),
        finalize(() => {
          this.visible = true;
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.material = response;
        this.data = this.sanitizer.bypassSecurityTrustHtml(
          response.properties['note:note']
        );
      })
    );
  }
}
