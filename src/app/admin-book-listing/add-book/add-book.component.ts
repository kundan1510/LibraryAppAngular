import { Component } from '@angular/core';
import { Book, BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { AdminbookService } from '../../services/adminbook.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  book: Book = {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    maxCopies: 0,
  };

  constructor(
    private bookService: BookService,
    private router: Router,
    private adminbookService: AdminbookService
  ) {}

  onSubmit(): void {
    this.adminbookService.addBook(this.book).subscribe(
      (response) => {
        console.log('Book added successfully!', response);
        this.router.navigate(['/admin-list']);
      },
      (error) => {
        console.error('Error adding book', error);
      }
    );
  }
}
