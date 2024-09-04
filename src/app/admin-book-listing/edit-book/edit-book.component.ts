import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { AdminbookService } from '../../services/adminbook.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
  editBookForm!: FormGroup;
  bookId!: string;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private adminBookService: AdminbookService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id') || '';

    this.editBookForm = this.fb.group({
      id: [0, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      maxCopies: [0, [Validators.required, Validators.min(1)]],
    });

    this.bookService.getBookById(this.bookId).subscribe((book) => {
      this.editBookForm.patchValue(book);
    });
  }

  onSubmit(): void {
    if (this.editBookForm.valid) {
      this.adminBookService
        .updateBook(this.editBookForm.value)
        .subscribe(() => {
          this.router.navigate(['/admin-list']); // Navigate back to the book list
        });
    }
  }
}
