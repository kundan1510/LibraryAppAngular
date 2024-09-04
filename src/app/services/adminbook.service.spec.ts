import { TestBed } from '@angular/core/testing';

import { AdminbookService } from './adminbook.service';

describe('AdminbookService', () => {
  let service: AdminbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
