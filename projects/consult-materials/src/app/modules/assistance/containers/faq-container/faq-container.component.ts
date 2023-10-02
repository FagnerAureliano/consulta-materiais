import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss'],
})
export class FaqContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  questions: any;
  actualScope: Scopes;
  _allScopes: Scopes[];
  _isActionBtnDisabled = false;
  _searchField: FormControl;
  _allScopeSearch: FormControl;

  checked: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private faqService: FAQService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.subs$.push(
      this.route.data.subscribe((res) => {
        this.questions = res.data.questions;
        this._allScopes = res.data.allScopes;
      })
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.actualScope = this._allScopes.find(
          (res) =>
            res.scope === localStorage.getItem('actualScope').toUpperCase()
        );
      });

    this._searchField = this.fb.control('');
  }
  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    const searchFieldChanges$ = this._searchField.valueChanges.pipe(
      filter(
        (value: string) => value.length === 0 || (value && !/^\s*$/.test(value))
      ),
      debounceTime(300),
      distinctUntilChanged()
    );
    this.subs$.push(
      searchFieldChanges$
        .pipe(
          switchMap((text: string) =>
            this.faqService.searchQuestions(text, this.actualScope.id).pipe(
              catchError((error) => {
                return throwError(error);
              })
            )
          )
        )
        .subscribe((res) => {
          this.questions = res;
        })
    );
  }

  handleCreateFAQ(): void {
    this.router.navigate(['assistance/content/faq/create']);
  }
  handleSearchByTag(tag: string): void {
    this.faqService
      .searchQuestions(tag, this.actualScope.id)
      .pipe(
        first(),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((res) => {
        this.questions = res;
        this._searchField.setValue(tag);
      });
  }
  handleAll(): void {}

  handleRemoveQuestion(question: any): void {
    this._isActionBtnDisabled = true;
    this.confirmationService.confirm({
      acceptLabel: 'Sim, excluir',
      rejectLabel: 'Cancelar',
      target: event.target,
      message: 'Deseja realmente excluir esta pergunta?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.subs$.push(
          this.faqService
            .removeQuestionByID(question.id)
            .pipe(
              catchError((err) => {
                return throwError(err);
              })
            )
            .subscribe(() => {
              this._isActionBtnDisabled = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Tudo OK',
                detail: 'Pergunta deletada com sucesso',
              });
              this.updateQuestionsList();
            })
        );
      },
      reject: () => {
        this._isActionBtnDisabled = false;
      },
    });
  }
  updateQuestionsList() {
    this.subs$.push(
      this.faqService
        .searchQuestions('', this.actualScope.id)
        .subscribe((res) => {
          this.questions = res;
        })
    );
  }
}
