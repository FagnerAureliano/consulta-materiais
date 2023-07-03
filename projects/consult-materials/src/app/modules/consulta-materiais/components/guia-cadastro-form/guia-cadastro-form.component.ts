import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!Object.keys(this.form.controls).length) {
      this.form.addControl(
        'guiaDocument',
        this.fb.control(null, [Validators.required])
      );
    }
  }
}
