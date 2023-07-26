import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.post<any>(`${this.endpoint}/file`, document);
  }
  createDocumentNote(document: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint}/note`, document);
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/file/${id}`, {
      headers: this.defaultHeaders,
    });
  }
  getThumbnail(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/file/thumbnail/${id}`, {
      headers: this.defaultHeaders,
    });
  }
  getDocumentFile(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/file/${id}`, {
      responseType: 'blob' as 'json',
    });
  }
}
