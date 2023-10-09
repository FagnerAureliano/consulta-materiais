import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-materials-links',
  templateUrl: './materials-links.component.html',
  styleUrls: ['./materials-links.component.scss'],
})
export class MaterialsLinksComponent implements OnInit {
  private subs$: Subscription[] = [];

  @Input() materials: any = [];
  @Output() textEmitter = new EventEmitter();

  _searchField: FormControl = this.fb.control('');

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subs$.push(
      this._searchField.valueChanges
        .pipe(
          filter(
            (value: string) =>
              value.length === 0 || (value && !/^\s*$/.test(value))
          ),
          debounceTime(300),
          distinctUntilChanged()
        )
        .subscribe((text: string) => {
          if (text.length > 0) {
            this.textEmitter.emit({
              searchText: text,
              primaryType: null,
              scopePath: null,
            });
          } else {
            this.materials = [];
          }
        })
    );
  }
 onClick(material: any): void {
  console.log(material.title);
  this.materials = [];
  this._searchField.setValue(material.title)
 }
}
