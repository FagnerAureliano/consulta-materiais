import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private cdref: ChangeDetectorRef
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
    console.log(this._form?.get('documentForm')?.valid);
  }
}
