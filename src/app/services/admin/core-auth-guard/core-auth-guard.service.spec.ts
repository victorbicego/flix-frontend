import { TestBed } from '@angular/core/testing';

import { CoreAuthGuardService } from './core-auth-guard.service';

describe('CoreAuthGuardService', () => {
  let service: CoreAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
