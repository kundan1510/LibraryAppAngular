import { Component, OnInit } from '@angular/core';
import {
  Subscription,
  SubscriptionService,
} from '../services/subscription.service';
import { CommonModule } from '@angular/common';
import { JwtService } from '../services/jwt.service';
import 'core-js/stable/atob';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  constructor(
    private subscriptionService: SubscriptionService,
    private jwtService: JwtService
  ) {}
  ngOnInit(): void {
    // Fetch the JWT token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      const userEmail = this.jwtService.getEmailFromToken(token);

      if (userEmail) {
        // Use the fetched email to get the user's subscriptions
        this.subscriptionService.getUserSubscriptions(userEmail).subscribe(
          (data) => (this.subscriptions = data),
          (error) => console.error('Error fetching subscriptions', error)
        );
      } else {
        console.error('No email found in token.');
      }
    } else {
      console.error('No token found in localStorage.');
    }
  }
}
