import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VideoSync } from '../../../../interfaces/admin/video-sync';
import { ConvertDurationPipe } from '../../../../services/general/convert-duration-pipe/convert-duration.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ConvertDurationPipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Output() openUpdateModal: EventEmitter<VideoSync> =
    new EventEmitter<VideoSync>();
  @Output() openDeleteModal: EventEmitter<VideoSync> =
    new EventEmitter<VideoSync>();
  @Output() openDescriptionModal: EventEmitter<VideoSync> =
    new EventEmitter<VideoSync>();
  @Input() videoList: VideoSync[] = [];

  constructor(private router: Router) {}

  public emitOpenUpdateModal(video: VideoSync): void {
    this.openUpdateModal.emit(video);
  }

  public emitOpenDeleteModal(video: VideoSync): void {
    this.openDeleteModal.emit(video);
  }

  public emitOpenDescriptionModal(video: VideoSync): void {
    this.openDescriptionModal.emit(video);
  }

  public navigateToChannelPage(channelId: string): void {
    this.router.navigate(['/channel/' + channelId], {
      queryParams: { category: 'ALL' },
    });
  }
}
