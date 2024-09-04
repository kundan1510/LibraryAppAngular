import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  //private readonly apiUrl = 'https://localhost:7192/api/Auth'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // login(credentials: {
  //   username: string;
  //   password: string;
  // }): Observable<{ token: string }> {
  //   return this.http.post<{ token: string }>(
  //     `${this.apiUrl}/signin`,
  //     credentials,
  //     {headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   });
  // }

  signup(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({
      email: userData.email,
      password: userData.password,
      role: 'User',
    });

    return this.http.post<any>(`${this.baseUrl}/Auth/signup`, body, {
      headers,
    });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ email: username, password: password });

    return this.http.post<any>(`${this.baseUrl}/Auth/signin`, body, {
      headers,
    });
  }

  setSession(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
