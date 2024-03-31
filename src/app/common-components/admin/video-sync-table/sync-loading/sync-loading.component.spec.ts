import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncLoadingComponent } from './sync-loading.component';

describe('SyncLoadingComponent', () => {
  let component: SyncLoadingComponent;
  let fixture: ComponentFixture<SyncLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SyncLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
