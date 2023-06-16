import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss'],
})
export class DocumentoCadastroFormComponent implements OnInit {
  form: FormGroup;
  uploadedFiles: any[] = [];

  @ViewChild('fileUpload') fileUpload: FileUpload;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      descricao: [null, [Validators.required]],
      document: [null, [Validators.required]],
    });
  }

  onShowUpload() {
    for (let file of this.fileUpload._files) {
      this.form.patchValue({ document: file });
    }

    console.log(this.form.value);
  }

  onClear() {
    this.form.get('document').setValue(null);
    console.log(this.form.value);
  }


  selectedTags: any[] = [];
  tagInput: string;
  tags: string[] = ['Vídeo', 'PDF', 'Excel', 'Outro'];

  filteredTags: string[];

  searchTags(event: any) {
    const query = event.query.toLowerCase();
    this.filteredTags = this.tags.filter(tag => tag.toLowerCase().includes(query));
  }

  addTag(event: any) {
    const selectedTag = event.itemValue;
    if (selectedTag && !this.selectedTags.includes(selectedTag)) {
      this.selectedTags.push(selectedTag);
      this.tagInput = '';
    }
  }
 
}
