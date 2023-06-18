import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMateriaisService {
  constructor(
    private http: HttpClient,
    @Inject('EXTERNAL_API') private endpoint
  ) {}

  searchTags(searchTerm: string): Observable<string[]> {
    const tags = ['Video', 'PDF', 'Excel', 'Imagem'];
    const filteredTags = tags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredTags);
  }

  getAll(startIndex: number, itemsPerPage: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.endpoint}/photos?_start=${startIndex}&_limit=${itemsPerPage}`
    );
  }
}
