import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Book {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  maxCopies: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = environment.apiUrl + '/Books';
  //private apiUrl = 'https://localhost:7192/api/Books'; // API URL

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }
}
