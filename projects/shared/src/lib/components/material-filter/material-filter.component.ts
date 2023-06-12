import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mat-material-filter',
  templateUrl: './material-filter.component.html',
  styleUrls: ['./material-filter.component.scss'],
})
export class MaterialFilterComponent implements OnInit {
  _form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this._form = this.fb.group({
      PDF: [null],
      video: [null],
      guiaRapido: [null],
    });
  }
  searchFilter() {
    console.log(this._form.value);
  }
  handleInputSearch(event) {
    
  }
}
