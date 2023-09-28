import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-faq-container',
  templateUrl: './faq-container.component.html',
  styleUrls: ['./faq-container.component.scss'],
})
export class FaqContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  questions: any;
  visibleTable = false;
  actualScope: string;
  _isActionBtnDisabled = false;

  _searchField: FormControl;

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
        // this.visibleTable = this.questions.length > 0 ? true : false;
      })
      
    );

    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.actualScope = localStorage.getItem('actualScope');
    });

    this._searchField = this.fb.control('');
  }
  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
   
    this._searchField.valueChanges
      .pipe(
        filter(
          (value: string) =>
            value.length === 0 || (value && !/^\s*$/.test(value))
        ),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        console.log(text);

      });
  }

  handleCreateFAQ(): void {
    this.router.navigate(['assistance/content/faq/create']);
  }

  handleRemoveQuestion(question: any) {
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
            .removeQuestionByID('2')
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
      this.faqService.getQuestionsByScope(this.actualScope).subscribe((res) => {
        this.questions = res;
        // this.visibleTable = this.questions.length > 0 ? true : false;
      })
    );
  }
}
