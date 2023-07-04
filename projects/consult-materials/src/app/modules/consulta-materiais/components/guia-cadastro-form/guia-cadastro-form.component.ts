import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaMateriaisService } from 'projects/consult-materials/src/app/services/consulta-materiais.service';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent implements OnInit {
  @Input() form: FormGroup;
  _whitelist: string[];

  constructor(private fb: FormBuilder,   private consultaService: ConsultaMateriaisService) {}

  ngOnInit(): void {
    if (!Object.keys(this.form.controls).length) {
      this.form.addControl(
        'guiaDocument',
        this.fb.control(null, [Validators.required])
      );
      this.form.addControl(
        'tags',
        this.fb.control(null, [Validators.required])
      );
      this.form.addControl(
        'title',
        this.fb.control(null, [Validators.required])
      );
      this.form.addControl(
        'description',
        this.fb.control(null, [Validators.required])
      );
    }
  }
  handleSearchTags(data: string | string[]): void {
    if (Array.isArray(data)) {
      data.length > 0
        ? this.form.get('tags').setValue(data)
        : this.form.get('tags').setValue(null);
    } else {
      this.consultaService.searchTags(data).subscribe((tags) => {

        const stringArray = tags.map((obj:any) => obj.tag);
        // console.log(stringArray);
        
        this._whitelist = stringArray;
      });
    }
  }
}
