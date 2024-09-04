import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminbookService {
  private baseUrl = environment.apiUrl;
  //private apiUrl = 'https://localhost:7192/api/Admin';

  constructor(private http: HttpClient) {}

  addBook(book: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Admin/add-book`, book);
  }

  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Admin/update-book`, book);
  }

  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/Admin/delete-book/${bookId}`
    );
  }
}
