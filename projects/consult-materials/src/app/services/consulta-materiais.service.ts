import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMateriaisService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': '*',
  });
  constructor(
    private http: HttpClient,
    @Inject('SEARCH_API_ENDPOINT') private searchEndpoint,
    @Inject('STREAM_API_ENDPOINT') private sstreamEndpoint
  ) {}

  searchTags(searchTerm: string): Observable<string[]> {
    const tags = ['Video', 'PDF', 'Excel', 'Imagem'];
    const filteredTags = tags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredTags);
  }

  getAll(startIndex: number = 0, itemsPerPage: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.searchEndpoint}/searches/entry-point?term=finor&pageSize=${itemsPerPage}&pageIndex=${startIndex}&sortBy=created&sortOrder=desc&continue&continue`,
      {
        headers: this.defaultHeaders,
      }
    );
  }
}
