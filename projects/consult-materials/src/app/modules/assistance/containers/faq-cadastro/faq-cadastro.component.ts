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
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { Tag } from 'projects/consult-materials/src/app/models/search.models';
import { FAQService } from 'projects/consult-materials/src/app/services/faq.service';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { SharedDataService } from 'projects/shared/src/lib/services/shared-data.service';

@Component({
  selector: 'app-faq-cadastro',
  templateUrl: './faq-cadastro.component.html',
  styleUrls: ['./faq-cadastro.component.scss'],
})
export class FaqCadastroComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  @Output() cadastroEmitter = new EventEmitter();
  @Input() _scopes: Scopes[];

  faqData: any;
  _allScopes: Scopes[];
  _whitelist: string[];
  _actualScope: string;

  form: FormGroup;

  hasDocuments: boolean = false;
  question: any;

  _changedTags: Tag[];
  whitelist: string[] = [];

  constructor(
    private fb: FormBuilder,
    private faqService: FAQService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private location: Location,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private searchService: SearchMaterialsService
  ) {
    this.subs$.push(
      this.route.data.subscribe((res) => {
        this._scopes = res.data.scopes;
        this._allScopes = res.data.allScopes;
      })
    );
    this.subs$.push(
      this.sharedDataService.actualScope$.subscribe((res) => {
        this._actualScope = res;
      })
    );
    const idQuestion = this.route.snapshot.paramMap.get('id');
    if (idQuestion) {
      this.subs$.push(
        this.faqService.getQuestionsByID(idQuestion).subscribe((res) => {
          this.faqData = res;
        })
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
    this.form = this.fb.group({
      content: ['', [Validators.required]],
      response: ['', [Validators.required]],
      nuxeoPathId: ['', Validators.required],
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
      this.hasDocuments = true;

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
    console.log(this.form);

    // if (this.form.valid) {
    // //   const questionData = {
    // //     content: this.form.get('content')?.value,
    // //     response: this.form.get('response')?.value,
    // //     nuxeoPathId: this.form.get('nuxeoPathId')?.value,
    // //   };

    // //   // const attachmentData = {
    // //   //   title: this.form.get('title')?.value,
    // //   //   description: this.form.get('description')?.value,
    // //   //   tags: this.form.get('tags')?.value,
    // //   // };

    // //   // const files: File[] = this.form.get('files')?.value || [];

    //   this.faqService
    //     .saveQuestion(this.form.value)
    //     .subscribe(
    //       (response) => {
    //         console.log('Question saved successfully', response);
    //         this.cadastroEmitter.emit(response);
    //       },
    //       (error) => {
    //         console.error('Error saving question', error);
    //       }
    //     );
    // }
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
