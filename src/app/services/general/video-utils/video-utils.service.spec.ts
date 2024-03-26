import { TestBed } from '@angular/core/testing';

import { VideoUtilsService } from './video-utils.service';

describe('VideoUtilsService', () => {
  let service: VideoUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
