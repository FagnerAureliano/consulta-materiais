import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialFilterService } from '../../services/material-filter.service';
import { searchObjectParams } from 'projects/shared/src/lib/models/search-object-params';
import { ClearService } from '../../services/clear.service';
import { HasContentService } from '../../services/has-content.service';

@Component({
  selector: 'mat-material-filter',
  templateUrl: './material-filter.component.html',
  styleUrls: ['./material-filter.component.scss'],
})
export class MaterialFilterComponent implements OnInit {
  _form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private materialFilter: MaterialFilterService,
    private clearService: ClearService,
    private hasContent: HasContentService,
  ) {}

  ngOnInit(): void {
    this._form = this.fb.group({
      searchText: [null, Validators.required],
      file: [null],
      picture: [null],
      video: [null],
      audio: [null],
      note: [null],
    });
  }

  searchFilter(): void {
    const searchObject = this.createFormObject();

    this.materialFilter.emitContent(searchObject);
  }

  onCheckboxChange(controlName: string) {
    //Através do nome do Control que mudou de estado, garante que apenas um checkbox possa ter o valor determinado por vez. Ignora o input searchtext
    Object.keys(this._form.controls)
      .filter(key => key !== controlName && key !== 'searchText')
      .forEach(key => this._form.get(key).setValue(null, { emitEvent: false }));
  }

  createFormObject(): searchObjectParams {
    //Obtém o valor do input searchText
    const searchText = this._form.get('searchText').value || '';
    
    let primaryType = null;

    //Determina o primaryType baseado no checkbox selecionado
    for (const key of ['file', 'picture', 'video', 'audio', 'note']) {
      if (this._form.get(key).value) {
        // Atribui o valor do checkbox selecionado
        primaryType = this._form.get(key).value[0]; 
        break;
      }
    }
  
    //Monta o objeto a ser retornado
    return {
      searchText,
      primaryType
    };
  }

  clear(): void {
    this._form.reset();
    this.hasContent.setActive(false);
    this.clearService.triggerClear();
  }
}
