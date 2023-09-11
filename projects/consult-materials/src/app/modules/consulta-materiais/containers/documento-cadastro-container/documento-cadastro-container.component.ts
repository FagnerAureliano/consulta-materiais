import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { Material } from 'projects/consult-materials/src/app/models/search.models';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';
import { Subscription, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-documento-cadastro-container',
  templateUrl: './documento-cadastro-container.component.html',
  styleUrls: ['./documento-cadastro-container.component.scss'],
})
export class DocumentoCadastroContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  _form: FormGroup;
  _whitelist: string[];
  _scopes: Scopes[];
  _material: Material;
  material_id: string;
  hasDocument: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private messageService: MessageService,
    private searchService: SearchMaterialsService,
    private streamService: StreamMaterialsService,
  ) {
    this.material_id = this.extractUUIDFromURL(
      route.snapshot['_routerState'].url
    );

    this.subs$.push(
      this.route.data.subscribe((res) => {
        this._scopes = res.data;
      })
    );
    if (this.material_id) {
      this.subs$.push(
        this.searchService
          .getDocumentByID(this.material_id)
          .subscribe((res: any) => {
            this._material = res;
          })
      );
    }
  }
  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((subs) => subs.unsubscribe());
  }

  ngOnInit(): void {
    this._form = this.fb.group({
      document: [null],
      tags: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      nuxeoPathId: [null, [Validators.required]],
    });
  }

  goBack(): void {
    this.location.back();
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

  onClear(): void {
    this._form.reset();
  }

  handleSave(): void {
    const formData = new FormData();

    formData.append('file', this._form?.value.document);
    const { id, title, description, tags, nuxeoPathId } = this._form?.value;
    const observableResolved = (_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo OK',
        detail: `${'Documento salvo com sucesso'}`,
      });
    };
    if (this.material_id) {
      formData.append(
        'data',
        JSON.stringify({
          title,
          description,
          tags,
        })
      );
      this.subs$.push(
        this.streamService
          .updateDocumentFile(this.material_id, formData)
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
      formData.append(
        'data',
        JSON.stringify({
          title,
          description,
          tags,
          nuxeoPathId,
        })
      );
      
      this.subs$.push(
        this.streamService
          .createDocumentFile(formData)
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

  extractUUIDFromURL(url: string): string | null {
    const uuidRegex = /\/([\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12})$/i;
    const [, uuid] = url.match(uuidRegex) || [];
    return uuid || null;
  }
}
