import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-documento-cadastro-container',
  templateUrl: './documento-cadastro-container.component.html',
  styleUrls: ['./documento-cadastro-container.component.scss'],
})
export class DocumentoCadastroContainerComponent implements OnInit {
  _form: FormGroup;
  isEdit: false; // TODO:  temporário até vir pela rota se será momento edit
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private consultaService: ConsultaMateriaisService,
    private cdref: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._form = this.fb.group({
      documentForm: this.fb.group({}),
    });
  }
  goBack(): void {
    this.location.back();
  }
  ngAfterContentChecked(): void {
    // if (!this.isEdit) {
    this._form.markAllAsTouched();
    this.cdref.detectChanges();
    // }
  }
  handleSave(): void {
    const formData = new FormData();
    formData.append('file', this._form?.get('documentForm').value.document);
    const { title, description, tags } = this._form?.get('documentForm').value;

    formData.append(
      'data',
      JSON.stringify({
        title,
        description,
        tags,
      })
    );
    const observableResolved = (_) => { 
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo OK',
        detail: `${'Documento salvo com sucesso'}`,
      });
    };

    this.consultaService
      .createDocumentNote(formData)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((res) => {
        observableResolved(res);
        this.goBack();
      });
  }
}
