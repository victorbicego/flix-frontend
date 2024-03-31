import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVideoSyncComponent } from './update-video-sync.component';

describe('UpdateVideoSyncComponent', () => {
  let component: UpdateVideoSyncComponent;
  let fixture: ComponentFixture<UpdateVideoSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVideoSyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVideoSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
