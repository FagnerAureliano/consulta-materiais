import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { Subscription, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss'],
})
export class MaterialDetailComponent implements OnDestroy {
  private _subs$: Subscription[] = [];
  @Input() documentId: any;

  visible: boolean;
  mimeType: string;
  note_material: SafeHtml;
  file_material: SafeResourceUrl;
  material: any;
  hasPermission: boolean = true;

  htmlElement = document.documentElement; // Obtém o elemento HTML raiz

  constructor(
    private service: ConsultaMateriaisService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {
    this._subs$.forEach((subs) => subs.unsubscribe());
  }

  handleDownload(): void {
    this._subs$.push(
      this.service
        .getDocumentFile(this.documentId)
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
          this.note_material = this.sanitizer.bypassSecurityTrustHtml(
            response.properties['note:note']
          );
        })
    );
  }
  onShow(isOpen: boolean): void {
    isOpen
      ? (this.htmlElement.style.overflow = 'hidden')
      : (this.htmlElement.style.overflow = '');
  }
}
