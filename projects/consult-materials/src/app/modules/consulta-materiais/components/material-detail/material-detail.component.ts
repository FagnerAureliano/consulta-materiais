import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { Subscription, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.scss'],
})
export class MaterialDetailComponent implements OnInit, OnDestroy {
  private _subs$: Subscription[] = [];

  @Input() showDiag: boolean;
  @Input() documentId: string;
  @Input() diagDetail: boolean;
  @Output() tagEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  material: any;
  visible: boolean;
  mimeType: string;
  note_material: SafeHtml;
  file_material: SafeResourceUrl;
  hasPermission: boolean = true;
  htmlElement:HTMLElement = document.documentElement; // Obtém o elemento HTML raiz

  constructor(
    private sanitizer: DomSanitizer,
    private streamService: StreamMaterialsService,
    private searchService: SearchMaterialsService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subs$.forEach((subs) => subs.unsubscribe());
  }

  handleDownload(): void {
    this._subs$.push(
      this.streamService
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
      this.searchService
        .getDocumentByID(this.documentId)
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
          this.note_material = this.sanitizer.bypassSecurityTrustHtml(
            response.properties['note:note']
          );
        })
    );
  }

  handleDelete(): void {
    this.deleteEmitter.emit();
  }

  handleTagSearch(tag: string): void {
    this.tagEmitter.emit(tag);
    this.onShow(false);
  }

  handleUpdate(): void {
    this.updateEmitter.emit();
    this.onShow(false);
  }

  onShow(isOpen: boolean): void {
    isOpen
      ? (this.htmlElement.style.overflow = 'hidden')
      : (this.htmlElement.style.overflow = '');
  }
}
