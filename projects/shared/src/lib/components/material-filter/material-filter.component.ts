import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClearService } from '../../services/clear.service';
import { SearchObjectParams } from '../../models/search-object-params';
import { HasContentService } from '../../services/has-content.service';
import { StreamSubjectService } from '../../services/stream-subject.service';
import { MaterialFilterService } from '../../services/material-filter.service';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';

@Component({
  selector: 'mat-material-filter',
  templateUrl: './material-filter.component.html',
  styleUrls: ['./material-filter.component.scss'],
})
export class MaterialFilterComponent implements OnInit {
  _form: FormGroup;
  scopes: Scopes[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clearService: ClearService,
    private hasContent: HasContentService,
    private filterService: MaterialFilterService,
    private streamService: StreamMaterialsService,
    private streamSubjectService: StreamSubjectService
  ) {
    this.setupScopes();
  }

  private setupScopes(): void {
    this.streamService.getScopes().subscribe({
      next: (scopes) => {
        this.scopes = scopes;
        this.streamSubjectService.setScopes(scopes);
      },
      error: (error) => {
        // Handle errors if needed
        console.error('Error fetching scopes:', error);
      },
    });
  }

  ngOnInit(): void {
    this._form = this.fb.group({
      searchText: [null, Validators.required],
      file: [null],
      note: [null],
      path: [null],
      video: [null],
      audio: [null],
      picture: [null],
    });
  }

  searchFilter(): void {
    const searchObject = this.createFormObject();

    this.filterService.emitContent(searchObject);

    const fullUrl = this.router.url;

    const segments = fullUrl.split('/');

    if (!segments.includes('search')) {
      this.router.navigate(['search'], { relativeTo: this.route });
    }
  }

  onCheckboxChange(controlName: string) {
    //Através do nome do Control que mudou de estado, garante que apenas um checkbox possa ter o valor determinado por vez. Ignora o input searchtext
    Object.keys(this._form.controls)
      .filter((key) => key !== controlName && key !== 'searchText')
      .forEach((key) =>
        this._form.get(key).setValue(null, { emitEvent: false })
      );
  }

  createFormObject(): SearchObjectParams {
    //Obtém o valor do input searchText
    const searchText = this._form.get('searchText').value || '';

    let primaryType = null;

    let scopePath = this._form.get('path').value;

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
      primaryType,
      scopePath,
    };
  }

  clear(): void {
    this._form.reset();
    this.hasContent.setActive(false);
    this.clearService.triggerClear();
  }
}
