import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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
  @Input() changedTags: any[] = [];

  tagify: Tagify = null;

  ngOnChanges(): void {    
    if (this.whitelist && this.whitelist.length > 0) {
      this.tagify.settings.whitelist = this.whitelist;
      this.tagify.loading(false);
    }
    if (this.changedTags && this.changedTags.length > 0) {
      this.changedTags.forEach((tag) => {
        this.tagify.addTags([{ value: tag.label }]);
      });
    } 
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    const inputElement = this.tagInputRef.nativeElement;
    const tagsControl = new UntypedFormControl();

    this.tagify = new Tagify(inputElement, {
      enforceWhitelist: false,
      whitelist: [],
      pattern: /^[a-zA-Z0-9\s-_]+$/, // Expressão regular para permitir apenas caracteres alfanuméricos, espaços, hifens e sublinhados
      dropdown: {
        enabled: 1,
        maxItems: 4,
        closeOnSelect: false,
      },

      callbacks: {
        add: () => {
          tagsControl.setValue(this.tagify.value.map((tag) => tag.value));
        },
        remove: () => {
          tagsControl.setValue(this.tagify.value.map((tag) => tag.value));
        },
        input: (e: { detail: { value: string } }) => {
          const inputValue = e.detail.value.trim();
          if (inputValue) {
            this.characterInputed.emit(inputValue);
            this.tagify.state.hasInvalidTag = false;
          }
        },
      },
    });

    this.tagify.on('invalid', (_) => (this.tagify.state.hasInvalidTag = true));

    tagsControl.valueChanges.subscribe(() => {
      this.tagsEmitter.emit(tagsControl.value);
    });
  }
}
