import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Material } from '../models/search.models';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMateriaisService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    @Inject('SEARCH_API_ENDPOINT') private searchEndpoint: string,
    @Inject('STREAM_API_ENDPOINT') private streamEndpoint: string
  ) {}

  searchTags(searchTerm: string): Observable<string[]> {
    return this.http.get<any>(
      `${this.searchEndpoint}/searches/auto-complete?term=${searchTerm}`
    );
  }
  createDocumentFile(document: any): Observable<any> {
    return this.http.post<any>(`${this.streamEndpoint}/file`, document);
  }
  createDocumentNote(document: any): Observable<any> {
    return this.http.post<any>(`${this.streamEndpoint}/note`, document);
  }

  getAll(
    term: string,
    startIndex: number = 0,
    itemsPerPage: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.searchEndpoint}/searches/entry-point?term=${term}&pageSize=${itemsPerPage}&pageIndex=${startIndex}&sortBy=created&sortOrder=desc&continue&continue`,
      // `${this.searchEndpoint}/photos?_start=${startIndex}&_limit=${itemsPerPage}`
      {
        headers: this.defaultHeaders,
      }
    );
  }
  getThumbnail(id: string): Observable<any> {
    return this.http.get<any>(`${this.streamEndpoint}/file/thumbnail/${id}`, {
      headers: this.defaultHeaders,
    });
  }
   getDocumentFile(id: string): Observable<any> {
    
    return this.http.get<any>(`${this.streamEndpoint}/file/document-blob/${id}`,{ responseType: 'blob' as 'json' });
  }
  getDocumentByID(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.searchEndpoint}/files/${id}`, {
      headers: this.defaultHeaders,
    });
  }
}
