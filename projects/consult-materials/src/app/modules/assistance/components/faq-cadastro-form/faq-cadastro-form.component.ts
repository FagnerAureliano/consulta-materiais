import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Tag } from 'primeng/tag';
import { Scopes } from 'projects/consult-materials/src/app/models/scopes.models';

@Component({
  selector: 'app-faq-cadastro-form',
  templateUrl: './faq-cadastro-form.component.html',
  styleUrls: ['./faq-cadastro-form.component.scss'],
})
export class FaqCadastroFormComponent implements OnInit {
  @Output() tagsEmitter = new EventEmitter();
  
  @Input() form: FormGroup;
  @Input() scopes: Scopes[]; 
  @Input() actualScope: string
  @Input() whitelist: string[] = [];

  _changedTags: Tag[];

  constructor() {}

  ngOnInit(): void {}

  handleSearchTags(data: string | string[]): void {
    this.tagsEmitter.emit(data);
  }
}
