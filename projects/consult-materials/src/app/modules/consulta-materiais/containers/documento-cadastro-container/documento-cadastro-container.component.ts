import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-documento-cadastro-container',
  templateUrl: './documento-cadastro-container.component.html',
  styleUrls: ['./documento-cadastro-container.component.scss'],
})
export class DocumentoCadastroContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  _form: FormGroup;
  _whitelist: string[];
  isEdit: false; // TODO:  temporário até vir pela rota se será momento edit

  constructor(
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private location: Location,
    private messageService: MessageService,
    private consultaService: ConsultaMateriaisService
  ) {}

  ngOnDestroy(): void {
    this.subs$.forEach((subs) => subs.unsubscribe());
  }

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
  handleSearchTags(data: string): void {
    this.subs$.push(
      this.consultaService.searchTags(data).subscribe((tags: string[]) => {
        this._whitelist = tags.map((obj: any) => obj.tag);
      })
    );
  }
  onClear(): void {
    this._form.reset();
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
    this.subs$.push(
      this.consultaService
        .createDocumentFile(formData)
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        )
        .subscribe((res) => {
          observableResolved(res);
          this.goBack();
        })
    );
  }
}
