import { TestBed } from '@angular/core/testing';

import { AdminVideoSyncService } from './admin-video-sync.service';

describe('AdminVideoSyncService', () => {
  let service: AdminVideoSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminVideoSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
