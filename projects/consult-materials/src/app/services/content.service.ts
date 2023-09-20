import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject('FAQ_API_ENDPOINT') private faqEndpoint: string
  ) { }

  getContentByScope(scope: string) {
    return this.http.get(`your-api-url/content/${scope}`);
  }

  getQuestions() {
    return this.http.get(`${this.faqEndpoint}/questions`);
  }
}
