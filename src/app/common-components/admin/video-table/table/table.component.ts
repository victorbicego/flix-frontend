import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/general/video';
import { Router } from '@angular/router';
import { ConvertDurationPipe } from '../../../../services/general/convert-duration-pipe/convert-duration.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ConvertDurationPipe],
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

  public emitOpenUpdateModal(video: Video): void {
    this.openUpdateModal.emit(video);
  }

  public emitOpenDeleteModal(video: Video): void {
    this.openDeleteModal.emit(video);
  }

  public emitOpenDescriptionModal(video: Video): void {
    this.openDescriptionModal.emit(video);
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
