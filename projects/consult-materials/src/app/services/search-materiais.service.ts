import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@shared';
import { first } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

import { mappedScope } from 'projects/shared/src/lib/utils/mapped-scopes';
import { SearchObjectParams } from 'projects/shared/src/lib/models/search-object-params';

@Injectable({
  providedIn: 'root',
})
export class SearchMaterialsService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private userService: UserService,
    private http: HttpClient,
    @Inject('SEARCH_API_ENDPOINT') private endpoint: string
  ) {}

  searchTags(searchTerm: string): Observable<string[]> {
    return this.http
      .get<any>(`${this.endpoint}/searches/auto-complete?term=${searchTerm}`)
      .pipe(first());
  }

  getEntrypointSearch(
    term: SearchObjectParams,
    startIndex: number = 0,
    itemsPerPage: number,
    scopePath: string = null
  ): Observable<any[]> {
    const searchText = term.searchText;
    const primaryType = term.primaryType || '';
    const scope = scopePath || mappedScope(this.userService.user.roles);

    const queryParams = new HttpParams()
      .set('term', searchText)
      .set('scopePath', scope)
      .set('primaryType', primaryType)
      .set('pageSize', itemsPerPage.toString())
      .set('pageIndex', startIndex.toString())
      .set('sortBy', 'created')
      .set('sortOrder', 'desc');

    const options = {
      headers: this.defaultHeaders,
      params: queryParams,
    };

    return this.http
      .get<any[]>(`${this.endpoint}/searches/entry-point`, options)
      .pipe(first());
  }

  getDocumentByID(id: string): Observable<Object> {
    return this.http
      .get<Object>(`${this.endpoint}/files/${id}`, {
        headers: this.defaultHeaders,
      })
      .pipe(first());
  }
}
