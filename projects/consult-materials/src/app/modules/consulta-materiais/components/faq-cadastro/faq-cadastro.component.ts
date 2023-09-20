import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faq-cadastro',
  templateUrl: './faq-cadastro.component.html',
  styleUrls: ['./faq-cadastro.component.scss']
})
export class FaqCadastroComponent implements OnInit {
  @Input() faqData: any;

  form: FormGroup;

  constructor() { 
    this.form = new FormGroup({
      content: new FormControl('', [Validators.required]),
      nuxeoPathId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.faqData) {
      this.form.setValue(this.faqData);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      
      console.log('Form submitted', this.form.value);
    }
  }
}
