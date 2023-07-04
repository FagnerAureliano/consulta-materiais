import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-guia-cadastro-container',
  templateUrl: './guia-cadastro-container.component.html',
  styleUrls: ['./guia-cadastro-container.component.scss'],
})
export class GuiaCadastroContainerComponent implements OnInit {
  screenWidth: number;
  isMobileScreen: boolean = false;
  _form: FormGroup;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private consultaService: ConsultaMateriaisService,
    private cdref: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

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
      });
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isMobileScreen = this.screenWidth < 450;
  }
}
