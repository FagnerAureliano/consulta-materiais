import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserService } from '@shared';
import { mappedScope } from 'projects/shared/src/lib/utils/mapped-scopes';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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

  getAll(
    term: string,
    startIndex: number = 0,
    itemsPerPage: number
  ): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${
          this.endpoint
        }/searches/entry-point?term=${term}&scopePath=${mappedScope(
          this.userService.user.roles
        )}&pageSize=${itemsPerPage}&pageIndex=${startIndex}&sortBy=created&sortOrder=desc&continue&continue`,
        {
          headers: this.defaultHeaders,
        }
      )
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
