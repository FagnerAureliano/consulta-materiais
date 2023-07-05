import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialFilterService } from '../../services/material-filter.service';

@Component({
  selector: 'mat-material-filter',
  templateUrl: './material-filter.component.html',
  styleUrls: ['./material-filter.component.scss'],
})
export class MaterialFilterComponent implements OnInit {
  _form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private materialFilter: MaterialFilterService
  ) {}

  ngOnInit(): void {
    this._form = this.fb.group({
      searchText: [null],
      all: [null],
      PDF: [null],
      movie: [null],
      guide: [null],
    });
  }
  searchFilter(): void {
    this.materialFilter.emitContent(this._form.value);
  }
}
