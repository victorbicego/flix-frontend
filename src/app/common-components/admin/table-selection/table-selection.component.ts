import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableSelectionCardComponent } from '../table-selection-card/table-selection-card.component';

@Component({
  selector: 'app-table-selection',
  standalone: true,
  imports: [CommonModule, TableSelectionCardComponent],
  templateUrl: './table-selection.component.html',
  styleUrl: './table-selection.component.scss',
})
export class TableSelectionComponent {
  @Output() changeTable: EventEmitter<string> = new EventEmitter<string>();
  @Input() tableList: string[] = [];
  @Input() selectedTable: string | null = null;

  constructor() {}

  public emitChangeTable(table: string): void {
    this.changeTable.emit(table);
  }
}
