import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scopes } from '../models/scopes.models';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StreamMaterialsService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(
    private http: HttpClient,
    @Inject('STREAM_API_ENDPOINT') private endpoint: string
  ) {}

  createDocumentFile(document: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/file`, document).pipe(first());
  }
  createDocumentNote(document: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/note`, document).pipe(first());
  }

  deleteDocument(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.endpoint}/file/${id}`, {
        headers: this.defaultHeaders,
      })
      .pipe(first());
  }
  getThumbnail(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.endpoint}/file/thumbnail/${id}`, {
        headers: this.defaultHeaders,
      })
      .pipe(first());
  }
  getDocumentFile(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.endpoint}/file/${id}`, {
        responseType: 'blob' as 'json',
      })
      .pipe(first());
  }
  getScopes(): Observable<Scopes[]> {
    return this.http
      .get<Scopes[]>(`${this.endpoint}/scopes`, {
        headers: this.defaultHeaders,
      })
      .pipe(first());
  }
}
