import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsSliderComponent } from './channels-slider.component';

describe('ChannelsSliderComponent', () => {
  let component: ChannelsSliderComponent;
  let fixture: ComponentFixture<ChannelsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelsSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
