import { Component, OnInit } from '@angular/core';
import { Book, BookService } from '../services/book.service';
import { JwtService } from '../services/jwt.service';
import { AdminbookService } from '../services/adminbook.service';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-book-listing',
  templateUrl: './admin-book-listing.component.html',
  styleUrls: ['./admin-book-listing.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule],
})
export class AdminBookListingComponent implements OnInit {
  books: Book[] = [];

  isAdmin: boolean = false;
  errorMessage: string = '';

  constructor(
    private bookService: BookService,
    private jwtService: JwtService,
    private adminbookService: AdminbookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      this.isAdmin = decodedToken?.Role === 'Admin';
      this.fetchBooks();
    }
  }
  isLoading: boolean = true;

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

  addBook(): void {
    this.router.navigate(['/admin/add-book']);
  }

  editBook(bookId: string): void {
    this.router.navigate(['/admin/edit-book', bookId]);
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.adminbookService.deleteBook(bookId).subscribe(
        () => this.fetchBooks(),
        (error) => console.error('Error deleting book', error)
      );
    }
  }
}
