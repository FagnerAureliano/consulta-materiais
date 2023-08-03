import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss'],
})
export class DocumentoCadastroFormComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Output() tagsEmitter = new EventEmitter();
  @Input() form: FormGroup;
  @Input() whitelist: string[] = [];
  @Input() scopes: Scopes[];
  @Input() material: any;

  uploadedFiles: any[] = [];

  onShowUpload() {
    for (let file of this.fileUpload._files) {
      this.form.patchValue({ document: file });
    }
  }
  ngOnInit(): void {
    if (this.material) {
      this.onFillForm();
    } else {
      //TEMPORARY
      setTimeout(() => {
        this.onFillForm();
      }, 300);
    }
  }
  onFillForm(): void {
    if (this.material) {
      this.form.get('title').setValue(this.material.title);
      this.form.get('tags').setValue(this.material.properties['nxtag:tags']);
      this.form
        .get('description')
        .setValue(this.material.properties['dc:description']);
    }
  }
  onClear() {
    this.form.get('document').setValue(null);
  }
  handleSearchTags(data: string | string[]): void {
    this.tagsEmitter.emit(data);
  }
  onChange() {
    console.log(this.form.value);
  }
}
