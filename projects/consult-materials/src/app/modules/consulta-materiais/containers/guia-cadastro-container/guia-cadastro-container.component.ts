import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss'],
})
export class GuiaCadastroContainerComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];
  screenWidth: number;
  isMobileScreen: boolean = false;
  _form: FormGroup;
  _whitelist: string[];

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
      guiaForm: this.fb.group({}),
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
    const { content, title, description, tags } =
      this._form?.get('guiaForm').value;

    const observableResolved = (_) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Tudo OK',
        detail: `${'Documento salvo com sucesso'}`,
      });
    };
    this.subs$.push(
      this.consultaService
        .createDocumentNote({ content, title, description, tags })
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
}
