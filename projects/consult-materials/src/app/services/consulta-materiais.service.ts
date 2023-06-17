import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaMateriaisService {
  constructor() {}

  searchTags(searchTerm: string): Observable<string[]> {
    const tags = ['Video', 'PDF', 'Excel', 'Imagem'];
    const filteredTags = tags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return of(filteredTags);
  }
}
