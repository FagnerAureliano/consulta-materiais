import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-material-link-detail',
  templateUrl: './material-link-detail.component.html',
  styleUrls: ['./material-link-detail.component.scss'],
})
export class MaterialLinkDetailComponent implements OnInit {
  @Input() material: any;
  @Input() mimeType: string;
  @Input() hasPermission: boolean;
  @Input() note_material: SafeHtml;
  @Input() isActionBtnDisabled: boolean;
  @Input() file_material: SafeResourceUrl;
  @Output() tagEmitter: EventEmitter<any> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();
  @Output() downloadEmitter: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleDownload(): void {
    this.downloadEmitter.emit()
  }

  handleDelete(): void {
    this.deleteEmitter.emit();
  }

  handleTagSearch(tag: string): void {
    this.tagEmitter.emit(tag);
  }

  handleUpdate(): void {
    this.updateEmitter.emit();
  }
}
