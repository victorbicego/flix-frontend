import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSyncTableComponent } from './video-sync-table.component';

describe('VideoSyncTableComponent', () => {
  let component: VideoSyncTableComponent;
  let fixture: ComponentFixture<VideoSyncTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSyncTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoSyncTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
