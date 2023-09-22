import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private defaultHeaders = new HttpHeaders();

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

  getQuestionsByScope(scope: string) {
    return this.http.get(`${this.faqEndpoint}/questions/scope/${scope}`);
  }

  saveQuestion(questionData: any, files?: File[], attachmentData?: any) {
    const formData = new FormData();

    if (files) {
      files.forEach((file, index) => {
        formData.append(`files`, file, file.name);
      });
    }else {
      formData.append(`files`, null);
    }

    if (attachmentData) {
      formData.append('attachmentData', JSON.stringify(attachmentData));
    }else {
      formData.append('attachmentData', null);
    }

    formData.append('questionData', JSON.stringify(questionData));

    return this.http.post(`${this.faqEndpoint}/questions`, formData);
  }
}
