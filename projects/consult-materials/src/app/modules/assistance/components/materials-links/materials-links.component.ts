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
  ) {
    faqLinksService.materialLinkUUID$.subscribe((res) => {
      this.selectedLinks = res ? res : [];
      this.isSelected = this.selectedLinks?.length > 0 ? false : true;
    });
  }

  ngOnInit(): void {
    this.materials = this.materials.filter(
      (material) => material.id != this.selectedLinks
    );
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
  onRemoveLink(link: { documentUid: any; }): void {
    this.selectedLinks = this.selectedLinks.filter(
      (lnk) => link.documentUid !== lnk.documentUid
    );
    this.updateSelectedLinks();
  }

  onAdd() {
    this.isSelected = !this.isSelected;
  }

  onClick(material: any): void {
    this.materials = [];
    this.selectedLinks.push({
      title: material.title,
      documentUid: material.id,
    });
    this.updateSelectedLinks();
  }

  private updateSelectedLinks(): void {
    this.isSelected = this.selectedLinks.length === 0;
    this.faqLinksService.setLinkUUID(this.selectedLinks);
  }
}
