import { TestBed } from '@angular/core/testing';

import { FeedAuthGuardService } from './feed-auth-guard.service';

describe('FeedAuthGuardService', () => {
  let service: FeedAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
