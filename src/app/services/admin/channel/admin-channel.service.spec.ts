import { TestBed } from '@angular/core/testing';

import { AdminChannelService } from './admin-channel.service';

describe('AdminChannelService', () => {
  let service: AdminChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
