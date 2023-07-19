import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss'],
})
export class DocumentoCadastroFormComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() form: FormGroup;
  @Output() tagsEmitter = new EventEmitter();
  @Input() whitelist: string[] = [];

  uploadedFiles: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!Object.keys(this.form.controls).length) {
      this.form.addControl(
        'title',
        this.fb.control(null, [Validators.required])
      );
      this.form.addControl(
        'description',
        this.fb.control(null, [Validators.required])
      );
      this.form.addControl(
        'document',
        this.fb.control(null, [Validators.required])
      );
      this.form.addControl(
        'tags',
        this.fb.control(null, [Validators.required])
      );
    }
  }

  onShowUpload() {
    for (let file of this.fileUpload._files) {
      this.form.patchValue({ document: file });
    }
  }
  onClear() {
    this.form.get('document').setValue(null);
  }
  handleSearchTags(data: string | string[]): void {
    if (Array.isArray(data)) {
      this.form.get('tags').setValue(data.length > 0 ? data : null);
    } else {
      this.tagsEmitter.emit(data);
    }
  }
}
