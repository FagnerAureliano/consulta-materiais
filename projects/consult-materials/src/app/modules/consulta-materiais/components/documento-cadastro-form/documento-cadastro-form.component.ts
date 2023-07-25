import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-documento-cadastro-form',
  templateUrl: './documento-cadastro-form.component.html',
  styleUrls: ['./documento-cadastro-form.component.scss'],
})
export class DocumentoCadastroFormComponent {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  @Input() form: FormGroup;
  @Output() tagsEmitter = new EventEmitter();
  @Input() whitelist: string[] = [];

  uploadedFiles: any[] = [];

  onShowUpload() {
    for (let file of this.fileUpload._files) {
      this.form.patchValue({ document: file });
    }
  }
  onClear() {
    this.form.get('document').setValue(null);
  }
  handleSearchTags(data: string | string[]): void {
  
      this.tagsEmitter.emit(data);
    
  }
}
