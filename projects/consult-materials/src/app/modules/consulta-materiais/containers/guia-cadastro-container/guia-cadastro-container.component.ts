import { Location } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss'],
})
export class GuiaCadastroContainerComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  private subs$: Subscription[] = [];
  isMobileScreen: boolean = false;
  _form: FormGroup;
  _scopes: Scopes[];
  _allScopes: Scopes[];
  _whitelist: string[];
  _material: any;
  material_id: string;
  hasDocument: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private searchService: SearchMaterialsService,
    private streamService: StreamMaterialsService
  ) {
    this.material_id = this.extractUUIDFromURL(
      route.snapshot['_routerState'].url
    );

    this.subs$.push(
      this.route.data.subscribe((res) => {
        this._scopes = res.data.userScopes;
        this._allScopes = res.data.allScopes;
      })
    );
    if (this.material_id) {
      this.subs$.push(
        this.searchService
          .getDocumentByID(this.material_id)
          .subscribe((res: any) => {
            this._material = res;
            this._scopes =  this._material ? this._allScopes : this._scopes
          })
      );
    }
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((subs) => subs.unsubscribe());
  }

  ngOnInit(): void {
    this._form = this.fb.group({
      content: [null],
      tags: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      nuxeoPathId: [null, [Validators.required]],
    });
  }

  goBack(): void {
    this.location.back();
  }

  handleSave(): void {
    const { content, title, description, tags, nuxeoPathId } =
      this._form?.value;

    const observableResolved = (_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo OK',
        detail: `${'Documento salvo com sucesso'}`,
      });
    };

    if (!this.material_id) {
      this.subs$.push(
        this.streamService
          .createDocumentNote({
            content,
            title,
            description,
            tags,
            nuxeoPathId,
          })
          .pipe(
            catchError((err) => {
              return throwError(err);
            })
          )
          .subscribe((res) => {
            observableResolved(res);
            this.goBack();
          })
      );
    } else {
      this.subs$.push(
        this.streamService
          .updateDocumentNote(this.material_id, {
            content,
            title,
            description,
            tags,
            nuxeoPathId,
          })
          .pipe(
            catchError((err) => {
              return throwError(err);
            })
          )
          .subscribe((res) => {
            observableResolved(res);
            this.goBack();
          })
      );
    }
  }

  handleSearchTags(data: string): void {
    if (Array.isArray(data)) {
      this._form.get('tags').setValue(data.length > 0 ? data : null);
    } else {
      this.subs$.push(
        this.searchService.searchTags(data).subscribe((tags: string[]) => {
          this._whitelist = tags.map((obj: any) => obj.tag);
        })
      );
    }
  }

  handleDownload(event): void {
    this.subs$.push(
      this.streamService
        .getDocumentFile(this.material_id)
        .pipe(
          catchError((err) => throwError(err)),
          tap((res) => {
            const blob = new Blob([res], {
              type: this._material.properties['file:content']['mime-type'],
            });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = this._material?.properties['file:content'].name;
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

  onClear(): void {
    this._form.reset();
  }

  extractUUIDFromURL(url: string): string | null {
    const uuidRegex = /\/([\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12})$/i;
    const [, uuid] = url.match(uuidRegex) || [];
    return uuid || null;
  }
}
