import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guia-cadastro-form',
  templateUrl: './guia-cadastro-form.component.html',
  styleUrls: ['./guia-cadastro-form.component.scss'],
})
export class GuiaCadastroFormComponent implements OnInit {
  text: string;
  form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      guiaDocument: [''],
    });
    this.form.get('guiaDocument').valueChanges.subscribe((data) => {
      console.log(data);
    });
  }
}
