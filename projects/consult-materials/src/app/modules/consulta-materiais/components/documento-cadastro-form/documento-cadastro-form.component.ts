import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss'],
})
export class DocumentoCadastroFormComponent implements OnInit {
  @Input() form: FormGroup;
  uploadedFiles: any[] = [];
  _whitelist: string[];

  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private fb: FormBuilder,
    private consultaService: ConsultaMateriaisService
  ) {}

  ngOnInit(): void {
    if (!Object.keys(this.form.controls).length) {
      this.form.addControl(
        'descricao',
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
    console.log(this.form.value);
  }
  onClear() {
    this.form.get('document').setValue(null);
  }
  handleSearchTags(data: string | string[]): void {
    if (Array.isArray(data)) {
      data.length > 0
        ? this.form.get('tags').setValue(data)
        : this.form.get('tags').setValue(null);
    } else {
      this.consultaService.searchTags(data).subscribe((tags) => {
        this._whitelist = tags;
      });
    }
  }
  onTest() {
    console.log(this.form.value);
  }
}
