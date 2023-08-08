import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import {
  Material,
  Tag,
} from 'projects/consult-materials/src/app/models/search.models';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss'],
})
export class DocumentoCadastroFormComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Output() tagsEmitter = new EventEmitter();
  @Output() downloadDoc = new EventEmitter();
  @Input() form: FormGroup;
  @Input() whitelist: string[] = [];
  @Input() scopes: Scopes[];
  @Input() material: Material;
  _changedTags: Tag[];

  hasDocuments: boolean = false;

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
    console.log(this.scopes[1]);

    if (this.material) {
      this.hasDocuments = true;
      // this.form.get('path').setValue(this.scopes[1].path);
      this.form.get('title').setValue(this.material.title);
      this.form
        .get('description')
        .setValue(this.material.properties['dc:description']);

      // Devido ao'Tag Input' ser do Shared, utilizando uma lib externa,
      // é necessário enviar a lista da tag para o mesmo e ser tratada por lá.
      this._changedTags = this.material.properties['nxtag:tags'];
    }
  }
  onClear(): void {
    this.form.get('document').setValue(null);
  }
  handleSearchTags(data: string | string[]): void {
    this.tagsEmitter.emit(data);
  }
  onRemove() {
    this.form.controls['document'].setValidators(Validators.required);
    this.form.controls['document'].updateValueAndValidity();
    this.hasDocuments = false;
  }
  onDownload(): void {
    this.downloadDoc.emit();
  }
}
