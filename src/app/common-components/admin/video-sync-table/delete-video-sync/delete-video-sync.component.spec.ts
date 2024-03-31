import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVideoSyncComponent } from './delete-video-sync.component';

describe('DeleteVideoSyncComponent', () => {
  let component: DeleteVideoSyncComponent;
  let fixture: ComponentFixture<DeleteVideoSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVideoSyncComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteVideoSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
