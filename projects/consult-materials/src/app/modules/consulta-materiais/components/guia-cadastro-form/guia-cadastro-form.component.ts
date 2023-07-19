import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() whitelist: string[];
  @Output() tagsEmitter = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!Object.keys(this.form.controls).length) {
      this.form.addControl(
        'content',
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
      this.form.get('tags').setValue(data.length > 0 ? data : null);
    } else {
      this.tagsEmitter.emit(data);
    }
  }
}
