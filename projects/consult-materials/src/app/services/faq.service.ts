import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  private defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject('FAQ_API_ENDPOINT') private endpoint: string
  ) {}

  getContentByScope(scope: string) {
    return this.http.get(`your-api-url/content/${scope}`, {
      headers: this.defaultHeaders,
    });
  }

  getQuestions() {
    return this.http.get(`${this.endpoint}/questions`, {
      headers: this.defaultHeaders,
    });
  }
  getQuestionsByID(id: string) {
    return this.http.get(`${this.endpoint}/questions/select-question/${id}`, {
      headers: this.defaultHeaders,
    });
  }

  getQuestionsByScope(scope: string) {
    return this.http.get(`${this.endpoint}/questions/scope/${scope}`, {
      headers: this.defaultHeaders,
    });
  }
  removeQuestionByID(idQuestion: string) {
    return this.http.delete(`${this.endpoint}/questions/${idQuestion}`, {
      headers: this.defaultHeaders,
    });
  }

  updateQuestion(id: string, questionData: Object) {
    return this.http.patch(`${this.endpoint}/questions/${id}`, questionData);
  }
  searchQuestions(term?: string, scopeId?: number) {
    return this.http.get(
      `${this.endpoint}/questions/auto-complete?term=${
        term ? term : ''
      }&nuxeoPathId=${scopeId ? scopeId : ''}`,
      {
        headers: this.defaultHeaders,
      }
    );
  }
  saveQuestion(questionData: any) {
    return this.http.post(`${this.endpoint}/questions`, questionData);
  }
}
