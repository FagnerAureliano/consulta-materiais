import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, of, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { SearchMaterialsService } from '../../../services/search-materiais.service';
import { StreamMaterialsService } from '../../../services/stream-materiais.service';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit, OnDestroy {
  private _subs$: Subscription[] = [];

  material: any;
  visible: boolean;
  mimeType: string;
  note_material: SafeHtml;
  file_material: SafeResourceUrl;
  htmlElement: HTMLElement = document.documentElement; // Obtém o elemento HTML raiz
  idDocumentManual: string;

  constructor(
    private sanitizer: DomSanitizer,
    private streamService: StreamMaterialsService,
    private searchService: SearchMaterialsService,
    @Inject('production') private production
  ) {
    this.idDocumentManual = production
      ? '78118d17-e8c9-424c-a9ea-7f75c28135ad'
      : '87cf65a7-6c7d-4617-a6db-52c2088d404e';
  }
  ngOnDestroy(): void {
    this._subs$.forEach((subs) => subs.unsubscribe());
  }
  ngOnInit(): void {
    this.showDialog();
  }

  handleDownload(): void {
    this._subs$.push(
      this.streamService
        .getDocumentFile(this.idDocumentManual)
        .pipe(
          catchError((err) => throwError(err)),
          tap((res) => {
            const blob = new Blob([res], {
              type: this.material.properties['file:content']['mime-type'],
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this.material?.title;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
          }),
          finalize(() => {
            const a = document.querySelector('a');
            if (a) {
              document.body.removeChild(a);
            }
          })
        )
        .subscribe()
    );
  }
  showDialog(): void {
    this._subs$.push(
      this.searchService
        .getDocumentByID(this.idDocumentManual)
        .pipe(
          tap((res: any) => {
            if (res.type != 'Note') {
              this.mimeType = res.properties['file:content']['mime-type'];
              this.streamService
                .getDocumentFile(res.id)

                .subscribe((file: any) => {
                  const blob = new Blob([file], {
                    type: this.mimeType,
                  });
                  const url = window.URL.createObjectURL(blob);
                  this.file_material =
                    this.sanitizer.bypassSecurityTrustResourceUrl(url);
                });
            }
          }),
          catchError(() => of(null)),
          finalize(() => {
            this.visible = true;
          })
        )
        .subscribe((response) => {
          this.material = response;
        })
    );
  }
}
