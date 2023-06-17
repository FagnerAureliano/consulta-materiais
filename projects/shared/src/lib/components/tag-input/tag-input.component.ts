import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import Tagify from '@yaireo/tagify';

@Component({
  selector: 'lib-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent implements OnInit, OnChanges {
  @ViewChild('tagInput') tagInputRef!: ElementRef;
  @Output() tagsEmitter = new EventEmitter<string[]>();
  @Output() characterInputed = new EventEmitter<string>();
  @Input() whitelist: string[] = [];

  tagify: Tagify = null;

  constructor() {}

  ngOnChanges(): void {
    if (this.whitelist) {
      this.tagify.settings.whitelist = this.whitelist;
      this.tagify.loading(false);
    }
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    const inputElement = this.tagInputRef.nativeElement;
    const tagsControl = new FormControl();

    this.tagify = new Tagify(inputElement, {
      enforceWhitelist: false,
      whitelist: [],
      dropdown: {
        enabled: 1,
        maxItems: Infinity,
        closeOnSelect: false,
      },
      callbacks: {
        add: (e) => {
          tagsControl.setValue(this.tagify.value.map((tag) => tag.value));
        },
        remove: (e) => {
          tagsControl.setValue(this.tagify.value.map((tag) => tag.value));
        },
        input: (e) => {
          const inputValue = e.detail.value.trim();
          if (inputValue) {
            this.characterInputed.emit(inputValue);
          }
        },
      },
    });

    tagsControl.valueChanges.subscribe(() => {
      this.tagsEmitter.emit(tagsControl.value);
    });
  }
}
