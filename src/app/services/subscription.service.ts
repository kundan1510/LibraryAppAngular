import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// export interface Subscription {
//   id: string;
//   bookId: string;
//   startDate: Date;
//   endDate: Date;
//   cost: number;
// }

export interface Subscription {
  userEmail: string | null | undefined; // userId
  //rowKey: string; // subscriptionId
  bookId: string;
  startDate: Date;
  endDate: Date;
  cost: number;
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl = environment.apiUrl + '/Subscriptions';
  // private apiUrl = 'https://localhost:7192/api/Subscriptions';
  constructor(private http: HttpClient) {}

  subscribe(subscription: Subscription): Observable<any> {
    return this.http.post(this.baseUrl, subscription);
  }

  getUserSubscriptions(email: string): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl}/${email}`);
  }

  cancelSubscription(email: string, bookid: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${email}/${bookid}`);
  }

  updateSubscription(subscription: Subscription): Observable<any> {
    return this.http.put(this.baseUrl, subscription);
  }
}
