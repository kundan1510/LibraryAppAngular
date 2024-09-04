import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookListingComponent } from './admin-book-listing.component';

describe('AdminBookListingComponent', () => {
  let component: AdminBookListingComponent;
  let fixture: ComponentFixture<AdminBookListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBookListingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBookListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
