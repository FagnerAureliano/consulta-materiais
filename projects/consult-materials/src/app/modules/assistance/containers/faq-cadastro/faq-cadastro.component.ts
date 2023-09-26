import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { Tag } from 'projects/consult-materials/src/app/models/search.models';
import { ContentService } from 'projects/consult-materials/src/app/services/content.service';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { SharedDataService } from 'projects/consult-materials/src/app/services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faq-cadastro',
  templateUrl: './faq-cadastro.component.html',
  styleUrls: ['./faq-cadastro.component.scss'],
})
export class FaqCadastroComponent implements OnInit {
  private subs$: Subscription[] = [];

  @ViewChild('fileUpload') fileUpload: FileUpload;

  @Output() cadastroEmitter = new EventEmitter();
  @Input() _scopes: Scopes[];
  
  faqData: any;
  _allScopes: Scopes[];
  _whitelist: string[];

  form: FormGroup;

  hasDocuments: boolean = false;

  _changedTags: Tag[];
  whitelist: string[] = [];

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private location: Location,
    private sharedDataService: SharedDataService,
    private route: ActivatedRoute,
    private searchService: SearchMaterialsService
  ) {
    this.sharedDataService.scopes$.subscribe((data) => {
      this._scopes = data;
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
      this.form.setValue(this.faqData);
    }
  }

  onShowUpload() {
    this.form.patchValue({ files: Array.from(this.fileUpload._files) });
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

    //   this.contentService
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
