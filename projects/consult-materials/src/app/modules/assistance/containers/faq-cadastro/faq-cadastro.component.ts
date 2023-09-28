import { Location } from '@angular/common';
import {
  Input,
  OnInit,
  Output,
  OnDestroy,
  Component,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tag } from 'projects/consult-materials/src/app/models/search.models';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-faq-cadastro',
  templateUrl: './faq-cadastro.component.html',
  styleUrls: ['./faq-cadastro.component.scss'],
})
export class FaqCadastroComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  @Output() cadastroEmitter = new EventEmitter();
  @Input() _scopes: Scopes[];

  _changedTags: Tag[];
  _allScopes: Scopes[];
  _whitelist: string[];
  _actualScope: string;

  faqData: any;
  form: FormGroup;
  whitelist: string[] = [];
  isEdit: boolean = false;
  idQuestion: string;

  constructor(
    private router: Router,
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
        this._allScopes = res.data.allScopes;
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
          .subscribe((res) => (this.faqData = res))
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
    const pathScope = this._allScopes.find(
      (res) => res.scope === this._actualScope.toUpperCase()
    );

    this.form = this.fb.group({
      nuxeoPathId: [pathScope?.id],
      content: ['', [Validators.required]],
      response: ['', [Validators.required]],
      attachments: [''],
      tags: ['', Validators.required],
    });

    if (this.faqData) {
      this.onFillForm();
    } else {
      //TEMPORARY
      setTimeout(() => {
        this.onFillForm();
      }, 300);
    }
  }
  onFillForm(): void {
    if (this.faqData) {
      const faqScope = this._allScopes.find(
        (res) => res.id === this.faqData.nuxeoPathId
      );
      this.form.get('nuxeoPathId').setValue(faqScope.id);
      this.form.get('content').setValue(this.faqData.content);
      this.form.get('response').setValue(this.faqData.response);

      // Devido ao'Tag Input' ser do Shared, utilizando uma lib externa,
      // é necessário enviar a lista da tag para o mesmo e ser tratada por lá.
      // this._changedTags = this.faqData.
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      this.form.patchValue({ files: files });
    }
  }

  handleSave(): void {
    console.log(this.form.value);

    const observableResolved = (_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo OK',
        detail: this.isEdit
          ? `${'Pergunta atualizada com sucesso'}`
          : `${'Pergunta salva com sucesso'}`,
      });
    };
    if (this.isEdit) {
      // this.subs$.push(
      //   this.faqService
      //     .updateQuestion(this.idQuestion, this.form.value)
      //     .pipe(
      //       catchError((err) => {
      //         return throwError(err);
      //       })
      //     )
      //     .subscribe((res) => {
      //       observableResolved(res);
      //       this.goBack();
      //     })
      // );
      observableResolved(null);
      this.goBack();
    } else {
      // this.subs$.push(
      //   this.faqService
      //     .saveQuestion(this.form.value)
      //     .pipe(
      //       catchError((err) => {
      //         return throwError(err);
      //       })
      //     )
      //     .subscribe((res) => {
      //       observableResolved(res);
      //       this.goBack();
      //     })
      // );
      observableResolved(null);
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }

  onClear(): void {
    this.form.reset();
  }

  handleSearchTags(data: string | string[]): void {
    if (Array.isArray(data)) {
      this.form.get('tags').setValue(data.length > 0 ? data : null);
    } else {
      this.subs$.push(
        this.searchService.searchTags(data).subscribe((tags: string[]) => {
          this._whitelist = tags.map((obj: any) => obj.tag);
        })
      );
    }
  }
}
