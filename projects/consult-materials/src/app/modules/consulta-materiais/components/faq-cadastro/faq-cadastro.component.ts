import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Tag } from 'projects/consult-materials/src/app/models/search.models';
import { ContentService } from 'projects/consult-materials/src/app/services/content.service';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-faq-cadastro',
  templateUrl: './faq-cadastro.component.html',
  styleUrls: ['./faq-cadastro.component.scss']
})
export class FaqCadastroComponent implements OnInit {
  private subs$: Subscription[] = [];

  @ViewChild('fileUpload') fileUpload: FileUpload;

  @Input() faqData: any;
  @Input() scopes: any;

  form: FormGroup;

  hasDocuments: boolean = false;

  _changedTags: Tag[];
  whitelist: string[] = [];

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService,
    private searchService: SearchMaterialsService,
  ) { 
    this.form = this.fb.group({
      content: ['', [Validators.required]],
      response: ['', [Validators.required]],
      nuxeoPathId: ['', [Validators.required]],
      files: [''],
      title: [''],
      description: [''],
      tags:[''],
    });
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.form.valid) {
        const questionData = {
          content: this.form.get('content')?.value,
          response: this.form.get('response')?.value,
          nuxeoPathId: this.form.get('nuxeoPathId')?.value,
        };

        const attachmentData = {
          title: this.form.get('title')?.value,
          description: this.form.get('description')?.value,
          tags: this.form.get('tags')?.value
        };

        const files: File[] = this.form.get('files')?.value || [];

        this.contentService.saveQuestion(questionData, files, attachmentData).subscribe(
          (response) => {
            console.log('Question saved successfully', response);
          },
          (error) => {
            console.error('Error saving question', error);
          }
      );
    }
  }

  onRemove() {
    this.form.controls['document'].setValidators(Validators.required);
    this.form.controls['document'].updateValueAndValidity();
    this.hasDocuments = false;
  }

  onDownload(): void {
    
  }

  handleSearchTags(data: string | string[]): void {
    if (Array.isArray(data)) {
      this.form.get('tags').setValue(data.length > 0 ? data : null);
    } else {
      this.subs$.push(
        this.searchService.searchTags(data).subscribe((tags: string[]) => {
          this.whitelist = tags.map((obj: any) => obj.tag);
        })
      );
    }
  }
}
