import { Subject, forkJoin, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {
  map,
  switchMap,
  takeUntil,
  catchError,
  defaultIfEmpty,
} from 'rxjs/operators';

import { SearchObjectParams } from 'projects/shared/src/lib/models/search-object-params';
import { SearchMaterialsService } from 'projects/consult-materials/src/app/services/search-materiais.service';
import { StreamMaterialsService } from 'projects/consult-materials/src/app/services/stream-materiais.service';

@Component({
  selector: 'app-materials-links-container',
  templateUrl: './materials-links-container.component.html',
  styleUrls: ['./materials-links-container.component.scss'],
})
export class MaterialsLinksContainerComponent implements OnInit {
  private _subs$ = new Subject();

  _materials: any[] = [];

  constructor(
    private searchService: SearchMaterialsService,
    private streamService: StreamMaterialsService
  ) {}

  ngOnInit(): void {}

  handleSearchMaterials(text: SearchObjectParams): void {
    if (text) {
      this.searchService
        .getEntrypointSearch(text, 0, 10)
        .pipe(
          takeUntil(this._subs$),
          switchMap((items: any) =>
            forkJoin(
              items.entries.map((value: { id: string }) =>
                this.getThumbnailWithFallback(value)
              )
            )
          )
        )
        .pipe(defaultIfEmpty([]))
        .subscribe((mappedItems) => {
          this._materials = mappedItems;
        });
    }
  }

  getThumbnailWithFallback(value: { id: string }) {
    return this.streamService.getThumbnail(value['id']).pipe(
      takeUntil(this._subs$),
      catchError(() => of(null)),
      map((thumbnail: any) => {
        const thumbnailBase64 =
          thumbnail && thumbnail.thumbnailBase64
            ? `data:image/png;base64,${thumbnail.thumbnailBase64}`
            : '';
        return { ...value, thumbnail: thumbnailBase64 };
      })
    );
  }
}
