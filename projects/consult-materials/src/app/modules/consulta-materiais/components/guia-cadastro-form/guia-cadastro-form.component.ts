import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent {
  @Input() form: FormGroup;
  @Input() whitelist: string[];
  @Input() scopes: Scopes[];
  @Output() tagsEmitter = new EventEmitter();

  handleSearchTags(data: string | string[]): void {
    this.tagsEmitter.emit(data);
  }
}
