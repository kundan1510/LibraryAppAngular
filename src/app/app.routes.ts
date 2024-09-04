import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListingComponent } from './listing/listing.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NgModule } from '@angular/core';
import { AdminGuard } from './guards/admin.guard';
import { AdminBookListingComponent } from './admin-book-listing/admin-book-listing.component';
import { EditBookComponent } from './admin-book-listing/edit-book/edit-book.component';
import { AddBookComponent } from './admin-book-listing/add-book/add-book.component';

export const routes: Routes = [
  {
    path: 'admin-list',
    component: AdminBookListingComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/edit-book/:id',
    component: EditBookComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/add-book',
    component: AddBookComponent,
    canActivate: [AdminGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
];
