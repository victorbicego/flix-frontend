import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/general/video';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Output() openUpdateModal: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() openDeleteModal: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() openDescriptionModal: EventEmitter<Video> =
    new EventEmitter<Video>();
  @Input() videoList: Video[] = [];

  constructor(private router: Router) {}

  public emitOpenUpdateModal(user: Video): void {
    this.openUpdateModal.emit(user);
  }

  public emitOpenDeleteModal(user: Video): void {
    this.openDeleteModal.emit(user);
  }

  public emitOpenDescriptionModal(user: Video): void {
    this.openDescriptionModal.emit(user);
  }

  public navigateToSingleVideo(videoId: string): void {
    this.router.navigate(['/video/' + videoId]);
  }

  public navigateToChannelPage(channelId: string): void {
    this.router.navigate(['/channel/' + channelId], {
      queryParams: { category: 'ALL' },
    });
  }
}
