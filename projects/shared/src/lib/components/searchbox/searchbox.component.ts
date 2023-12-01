import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';

import { Observable, of, timer } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  mapTo,
  mergeAll,
  share,
  takeUntil,
} from 'rxjs/operators';

import { LoadingBarService } from '../../services/loading-bar.service';
import { SearchBoxService } from '../../services/searchbox.service';

@Component({
  selector: 'shrd-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit, OnDestroy {
  private subs$: Subscription[] = [];

  _searchField: UntypedFormControl;

  @Output() changed: EventEmitter<
    [
      string,
      (service: object, method: string, ...args: any[]) => Observable<any>
    ]
  > = new EventEmitter();

  constructor(
    private fb: UntypedFormBuilder,
    private loading: LoadingBarService,
    private searchBoxService: SearchBoxService
  ) {
    this._searchField = this.fb.control('');
  }

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
          this.searchBoxService.emitInputChange([text, this.handleLoadingOf.bind(this)]);
        })
    );
  }

  ngOnDestroy(): void {
    this.subs$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  public handleLoadingOf(
    service: any,
    method: string,
    ...args: any[]
  ): Observable<any> {
    const observable$ = service[method](...args).pipe(share());

    const isLoading$ = of(
      timer(250).pipe(mapTo(true), takeUntil(observable$)), // Limite do tempo de resposta perceptivo ao usuário
      observable$.pipe(delay(500), mapTo(false)) // Tempo mínimo de duração do loading
    ).pipe(mergeAll()) as Observable<boolean>;

    this.subs$.push(
      isLoading$.subscribe((value) => {
        if (value) {
          this.loading.start();
        } else {
          this.loading.end();
        }
      })
    );

    return observable$;
  }
}
