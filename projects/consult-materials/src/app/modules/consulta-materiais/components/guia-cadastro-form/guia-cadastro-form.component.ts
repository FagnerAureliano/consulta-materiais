import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';
import {
  Material,
  Tag,
} from 'projects/consult-materials/src/app/models/search.models';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent implements OnInit {
  @Input() form: UntypedFormGroup;
  @Input() whitelist: string[];
  @Input() scopes: Scopes[];
  @Output() tagsEmitter = new EventEmitter();
  @Input() material: Material;
  @Input() _changedTags: Tag[];
  hasDocuments: boolean = false;

  handleSearchTags(data: string | string[]): void {
    this.tagsEmitter.emit(data);
  }
  ngOnInit(): void {
    if (this.material) {
      this.onFillForm();
    } else {
      //TEMPORARY
      setTimeout(() => {
        this.onFillForm();
      }, 300);
    }
  }
  onFillForm(): void {
    if (this.material) {
      this.hasDocuments = true;

      const materialScope = this.scopes.find(
        (res) => res.scope === this.material.properties['dc:source']
      );
      this.form.get('nuxeoPathId').setValue(materialScope.id);

      this.form.get('title').setValue(this.material.title);
      this.form.get('content').setValue(this.material.properties['note:note']);
      this.form
        .get('description')
        .setValue(this.material.properties['dc:description']);

      // Devido ao'Tag Input' ser do Shared, utilizando uma lib externa,
      // é necessário enviar a lista da tag para o mesmo e ser tratada por lá.
      this._changedTags = this.material.properties['nxtag:tags'];
    }
  }
}
