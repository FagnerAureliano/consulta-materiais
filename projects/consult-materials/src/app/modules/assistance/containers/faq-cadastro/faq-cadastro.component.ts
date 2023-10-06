import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, tap } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Tag } from 'projects/consult-materials/src/app/models/search.models';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import { Question } from 'projects/consult-materials/src/app/models/question.models';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';

@Component({
  selector: 'app-faq-cadastro',
  templateUrl: './faq-cadastro.component.html',
  styleUrls: ['./faq-cadastro.component.scss'],
})
export class FaqCadastroComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  @Output() cadastroEmitter = new EventEmitter();

  _scopes: Scopes[];
  _changedTags: Tag[];
  _whitelist: string[];
  _actualScope: string;

  form: FormGroup;
  question: Question;
  idQuestion: string;
  isEdit: boolean = false;
  whitelist: string[] = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private faqService: FAQService,
    private cdref: ChangeDetectorRef,
    private messageService: MessageService,
    private searchService: SearchMaterialsService
  ) {
    this.subs$.push(
      this.route.data.subscribe((res) => {
        this._scopes = res.data.scopes;
      })
    );

    this._actualScope = localStorage.getItem('actualScope');
    this.idQuestion = this.route.snapshot['_routerState'].url.split('/')[5];

    if (this.idQuestion && this.idQuestion !== 'create') {
      this.isEdit = true;
      this.subs$.push(
        this.faqService
          .getQuestionsByID(this.idQuestion)
          .pipe(
            catchError((err) => {
              this.goBack();
              return throwError(err);
            })
          )
          .subscribe((res) => (this.question = res))
      );
    }
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    const pathScope = this._scopes.find(
      (res) => res.scope === this._actualScope.toUpperCase()
    );

    this.form = this.fb.group({
      content: [null, [Validators.required]],
      response: [null, [Validators.required]],
      tags: [null, Validators.required],
      attachments: [null],
      nuxeoPathId: [pathScope?.id],
    });

    if (this.question) {
      this.onFillForm();
    } else {
      //TEMPORARY
      setTimeout(() => {
        this.onFillForm();
      }, 300);
    }
  }
  onFillForm(): void {
    if (this.question) {
      const faqScope = this._scopes.find(
        (res) => res.id === this.question.nuxeoPathId
      );
      this.form.get('nuxeoPathId').setValue(faqScope.id);
      this.form.get('content').setValue(this.question.content);
      this.form.get('response').setValue(this.question.response);
      // Devido ao'Tag Input' ser do Shared, utilizando uma lib externa,
      // é necessário enviar a lista da tag para o mesmo e ser tratada por lá.
      this._changedTags = this.question.tags;
    }
  }

  handleSave(): void {
    const successMessage = this.isEdit
      ? 'Pergunta atualizada com sucesso'
      : 'Pergunta salva com sucesso';

    const saveOrUpdate = this.isEdit
      ? () => this.faqService.updateQuestion(this.idQuestion, this.form.value)
      : () => this.faqService.saveQuestion(this.form.value);

    this.subs$.push(
      saveOrUpdate()
        .pipe(
          catchError((err) => throwError(err)),
          tap(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Tudo OK',
              detail: successMessage,
            });
            this.goBack();
          })
        )
        .subscribe()
    );
  }

  goBack(): void {
    this.location.back();
  }

  onClear(): void {
    this._changedTags = null;
    this.form.reset();
  }

  handleSearchTags(data: string | string[]): void {
    if (Array.isArray(data)) {
      this.form.get('tags').setValue(data.length > 0 ? data : null);
    } else {
      this.subs$.push(
        this.searchService.searchTags(data).subscribe((tags: string[]) => {
          this._whitelist = tags.map((obj: any) => obj.label);
        })
      );
    }
  }
}
