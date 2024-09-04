import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
//import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']); // Redirect to login after signup
        },
        error: (error) => {
          this.errorMessage = 'Signup failed. Please try again.';
          console.error('Signup error', error);
        },
      });
    }
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.authService
  //       .login(this.loginForm.value.username, this.loginForm.value.password)
  //       .subscribe({
  //         next: (response) => {
  //           // Handle successful login
  //           this.authService.setSession(response.token);
  //           this.router.navigate(['/listing']);
  //         },
  //         error: (err) => {
  //           this.errorMessage = 'Invalid username or password';
  //         },
  //       });
  //   }
}
