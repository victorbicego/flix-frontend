import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../interfaces/general/video';
import { Channel } from '../../../interfaces/general/channel';
import { User } from '../../../interfaces/admin/user';

@Component({
  selector: 'app-table-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss',
})
export class TablePaginationComponent {
  @Output() nextPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevPage: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePageSize: EventEmitter<number> = new EventEmitter<number>();
  @Input() currentPage: number | null = null;
  @Input() pageSize: number | null = null;
  @Input() list: User[] | Video[] | Channel[] = [];

  pageSizeOptions: number[] = [10, 20, 50];

  public emitNextPage(): void {
    this.nextPage.emit();
  }

  public emitPrevPage(): void {
    this.prevPage.emit();
  }

  public emitChangePageSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const size = parseInt(selectElement.value, 10);
    this.changePageSize.emit(size);
  }
}
