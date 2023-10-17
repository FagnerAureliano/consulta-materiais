import { Location } from '@angular/common';
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
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, of, throwError } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';

import { Role, UserService } from '@shared';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';

@Component({
  selector: 'app-material-link-detail-container',
  templateUrl: './material-link-detail-container.component.html',
  styleUrls: ['./material-link-detail-container.component.scss'],
})
export class MaterialLinkDetailContainerComponent implements OnInit, OnDestroy {
  private _subs$ = new Subject();

  @Input() showDiag: boolean;
  @Input() documentId: string;
  @Input() diagDetail: boolean;
  @Output() tagEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  material: any;
  visible: boolean;
  mimeType: string;
  _hasPermission: boolean;
  note_material: SafeHtml;
  file_material: SafeResourceUrl;
  _isActionBtnDisabled: boolean = false;
  htmlElement: HTMLElement = document.documentElement; // Obtém o elemento HTML raiz

  constructor(
    private route: Router,
    private location: Location,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private messageService: MessageService,
    private streamService: StreamMaterialsService,
    private searchService: SearchMaterialsService,
    private confirmationService: ConfirmationService
  ) {
    this._hasPermission =
      userService.user.roles.includes(Role.ADMIN) ||
      userService.user.roles.includes(Role.MANAGER);
  }

  ngOnInit(): void {
    if (this.router.snapshot.params.id) {
      this.documentId = this.router.snapshot.params.id;
      this.onShowDocument();
    }
  }

  ngOnDestroy(): void {
    this._subs$.next();
    this._subs$.complete();
  }

  handleDownload(): void {
    this.streamService
      .getDocumentFile(this.documentId)
      .pipe(
        takeUntil(this._subs$),
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
      .subscribe();
  }

  onShowDocument(): void {
    this.searchService
      .getDocumentByID(this.documentId)
      .pipe(
        takeUntil(this._subs$),
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
      });
  }
  goBack(): void {
    this.location.back();
  }

  handleTagSearch(tag: string): void {
    this.route.navigate([`/materials/search?q=${tag}`]);
    this.tagEmitter.emit(tag);
  }

  updateDocument(): void {
    const { id, type } = this.material;
    const routePrefix =
      type === 'Note' ? 'guia-cadastro' : 'documento-cadastro';
    this.route.navigate([`/materials/${routePrefix}/edit/${id}`]);
  }

  handleDelete(): void {
    this.setActionButtonState(true);

    this.confirmationService.confirm({
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      target: event.target,
      message: 'Deseja realmente excluir este documento?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.streamService
          .deleteDocument(this.material.id)
          .pipe(
            takeUntil(this._subs$),
            catchError((err) => {
              this.setActionButtonState(false);
              return throwError(err);
            })
          )
          .subscribe(() => {
            this.setActionButtonState(false);
            this.handleDeleteSuccess();
            this.route.navigate([`/materials/search`]);
          });
      },
      reject: () => {
        this.setActionButtonState(false);
      },
    });
  }

  private setActionButtonState(isDisabled: boolean): void {
    this._isActionBtnDisabled = isDisabled;
  }

  private handleDeleteSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Tudo OK',
      detail: 'Documento deletado com sucesso',
    });
  }
}
