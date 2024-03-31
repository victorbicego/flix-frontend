import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSyncDescriptionComponent } from './video-sync-description.component';

describe('VideoSyncDescriptionComponent', () => {
  let component: VideoSyncDescriptionComponent;
  let fixture: ComponentFixture<VideoSyncDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSyncDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoSyncDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
