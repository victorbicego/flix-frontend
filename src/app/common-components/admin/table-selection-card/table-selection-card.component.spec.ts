import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSelectionCardComponent } from './table-selection-card.component';

describe('TableSelectionCardComponent', () => {
  let component: TableSelectionCardComponent;
  let fixture: ComponentFixture<TableSelectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSelectionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSelectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
