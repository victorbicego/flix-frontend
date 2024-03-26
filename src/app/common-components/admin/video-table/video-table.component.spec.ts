import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTableComponent } from './video-table.component';

describe('VideoTableComponent', () => {
  let component: VideoTableComponent;
  let fixture: ComponentFixture<VideoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
