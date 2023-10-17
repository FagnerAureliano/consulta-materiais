import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  first,
  switchMap,
} from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Role, UserService } from '@shared';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import { Question } from 'projects/consult-materials/src/app/models/question.models';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss'],
})
export class FaqContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  actualScope: Scopes;
  questions: Question | any;
  searchAllCheck: boolean = false;

  _scopes: Scopes[];
  _searchField: FormControl;
  _isActionBtnDisabled = false;
  _hasPermission: boolean; //ALLOW TO CREATE/EDIT/EXCLUDE BY ADMIN OR MANAGER

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private faqService: FAQService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this._hasPermission =
      userService.user.roles.includes(Role.ADMIN) ||
      userService.user.roles.includes(Role.MANAGER);

    this.subs$.push(
      this.route.data.subscribe((res) => {
        this.questions = res.data.questions;
        this._scopes = res.data.scopes;
      })
    );

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.actualScope = this._scopes.find(
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
            this.faqService
              .searchQuestions(
                text,
                this.searchAllCheck ? null : this.actualScope.id
              )
              .pipe(
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
  handleLinkRedirect(link: { documentUid: string }): void {
    this.router.navigate([`/materials/detail/${link.documentUid}`]);
  }

  handleSearchByTag(tag: string): void {
    this.faqService
      .searchQuestions(tag, this.searchAllCheck ? null : this.actualScope.id)
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
  onQuestionView(questionId: string): void {
    this.subs$.push(
      this.faqService.getQuestionsByIDForCount(questionId).subscribe()
    );
  }
  handleEdit(question: Question): void {
    this.router.navigate([`/assistance/content/faq/update/${question.id}`]);
  }

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
        .searchQuestions('', this.searchAllCheck ? null : this.actualScope.id)
        .subscribe((res) => {
          this.questions = res;
        })
    );
  }
}
