import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss'],
})
export class GuiaCadastroContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  screenWidth: number;
  isMobileScreen: boolean = false;
  _form: FormGroup;
  _scopes: Scopes[];
  _whitelist: string[];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private searchService: SearchMaterialsService,
    private streamService: StreamMaterialsService
  ) {
    this.subs$.push(
      this.route.data.subscribe((res) => {
        this._scopes = res.data.scopes;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs$.forEach((subs) => subs.unsubscribe());
  }

  ngOnInit(): void {
    this._form = this.fb.group({
      content: [null, [Validators.required]],
      tags: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      scopePath: [null, [Validators.required]],
    });
  }
  goBack(): void {
    this.location.back();
  }
  handleSave(): void {
    const { content, title, description, tags } = this._form?.value;

    const observableResolved = (_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo OK',
        detail: `${'Documento salvo com sucesso'}`,
      });
    };
    this.subs$.push(
      this.streamService
        .createDocumentNote({ content, title, description, tags })
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
}
