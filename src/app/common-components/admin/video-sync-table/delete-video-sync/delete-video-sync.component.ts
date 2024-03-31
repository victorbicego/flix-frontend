import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoSync } from '../../../../interfaces/admin/video-sync';
import { AdminVideoSyncService } from '../../../../services/admin/video-sync/admin-video-sync.service';

@Component({
  selector: 'app-delete-video-sync',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-video-sync.component.html',
  styleUrl: './delete-video-sync.component.scss',
})
export class DeleteVideoSyncComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() videoToDelete: VideoSync | null = null;

  constructor(private adminVideoSyncService: AdminVideoSyncService) {}

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public deleteVideo(): void {
    if (this.videoToDelete) {
      this.adminVideoSyncService
        .deleteVideoSync(this.videoToDelete.id!)
        .subscribe({
          next: () => {
            console.log(
              'Video delete successfully with ID:',
              this.videoToDelete!.id
            );
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while deleting video:', error);
          },
        });
    }
  }
}
