import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

import { FAQLinksService } from 'projects/shared/src/lib/services/faq-links.service';

@Component({
  selector: 'app-materials-links',
  templateUrl: './materials-links.component.html',
  styleUrls: ['./materials-links.component.scss'],
})
export class MaterialsLinksComponent implements OnInit {
  private subs$: Subscription[] = [];

  @Input() materials: any = [];
  @Output() textEmitter = new EventEmitter();

  selectedLinks: any[] = [];
  isSelected: boolean = true;
  _searchField: FormControl = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    private faqLinksService: FAQLinksService
  ) {}

  ngOnInit(): void {
    this.materials = this.materials.filter(material => material.id != this.selectedLinks)
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
  onRemoveLink(link: any): void {
    this.selectedLinks = this.selectedLinks.filter((lnk) => link.id !== lnk.id);
    this.updateSelectedLinks();
  }

  onAdd() {
    this.isSelected = !this.isSelected;
  }

  onClick(material: any): void { 
    this.materials = [];
    this.selectedLinks.push({ title: material.title, id: material.id });
    this.updateSelectedLinks();
  }

  private updateSelectedLinks() {
    this.isSelected = this.selectedLinks.length === 0;
    const UUIDs = this.selectedLinks.map((item) => item.id);
    this.faqLinksService.setLinkUUID(UUIDs);
  }
}
