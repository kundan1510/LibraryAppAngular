import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookService, Book } from '../services/book.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SubscriptionService,
  Subscription,
} from '../services/subscription.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
})
export class ListingComponent implements OnInit {
  books: Book[] = [];
  userEmail: string | null | undefined = '';
  errorMessage: string = '';
  subscriptionForm!: FormGroup;
  selectedBook: Book | null = null;

  constructor(
    private bookService: BookService,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder,
    private jwtService: JwtService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.userEmail = this.jwtService.getEmailFromToken(token);
    }
    this.fetchBooks();
    this.subscriptionForm = this.fb.group({
      days: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  isLoading: boolean = true;
  openSubscriptionForm(book: Book): void {
    this.selectedBook = book;
    this.subscriptionForm.reset({ days: 1 });
  }

  closeSubscriptionForm(): void {
    this.selectedBook = null;
  }

  fetchBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  submitSubscription(): void {
    if (this.subscriptionForm.valid && this.selectedBook) {
      const subscription: Subscription = {
        userEmail: this.userEmail,
        //rowKey: `${this.selectedBook.title}-${new Date().getTime()}`,
        bookId: this.selectedBook.id,
        startDate: new Date(),
        endDate: new Date(
          new Date().setDate(
            new Date().getDate() + this.subscriptionForm.value.days
          )
        ),
        cost: this.subscriptionForm.value.days * 1.0, // Assuming $1 per day
      };

      this.subscriptionService.subscribe(subscription).subscribe(
        () => {
          alert('Subscribed successfully!');
          this.closeSubscriptionForm();
        },
        (error) => console.error('Error subscribing to book', error)
      );
    }
  }
}
