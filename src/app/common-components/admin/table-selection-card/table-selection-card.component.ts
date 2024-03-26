import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-selection-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-selection-card.component.html',
  styleUrl: './table-selection-card.component.scss',
})
export class TableSelectionCardComponent {
  @Output() changeTable: EventEmitter<string> = new EventEmitter<string>();
  @Input() table: string | null = null;
  @Input() isSelected: boolean = false;

  constructor() {}

  public emitChangeCategory(table: string): void {
    this.changeTable.emit(table);
  }
}
