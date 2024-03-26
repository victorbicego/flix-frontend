import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/general/video';
import { AdminVideoService } from '../../../../services/admin/video/admin-video.service';

@Component({
  selector: 'app-delete-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-video.component.html',
  styleUrl: './delete-video.component.scss',
})
export class DeleteVideoComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() videoToDelete: Video | null = null;
  @Input() environment: string | null = null;

  constructor(private adminVideoService: AdminVideoService) {}

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public deleteVideo(): void {
    if (this.environment === 'core') {
      this.deleteVideoCore();
    }
    if (this.environment === 'feed') {
      this.deleteVideoFeed();
    }
  }

  private deleteVideoFeed(): void {
    if (this.videoToDelete) {
      this.adminVideoService.deleteVideoFeed(this.videoToDelete.id!).subscribe({
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

  private deleteVideoCore(): void {
    if (this.videoToDelete) {
      this.adminVideoService.deleteVideoCore(this.videoToDelete.id!).subscribe({
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
