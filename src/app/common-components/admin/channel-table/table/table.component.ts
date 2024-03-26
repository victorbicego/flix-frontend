import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Channel } from '../../../../interfaces/general/channel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Output() openUpdateModal: EventEmitter<Channel> =
    new EventEmitter<Channel>();
  @Output() openDeleteModal: EventEmitter<Channel> =
    new EventEmitter<Channel>();
  @Input() channelList: Channel[] = [];

  constructor(private router: Router) {}

  public emitOpenUpdateModal(channel: Channel): void {
    this.openUpdateModal.emit(channel);
  }

  public emitOpenDeleteModal(channel: Channel): void {
    this.openDeleteModal.emit(channel);
  }

  public navigateToChannelPage(channelId: string): void {
    this.router.navigate(['/channel/' + channelId], {
      queryParams: { category: 'ALL' },
    });
  }
}
