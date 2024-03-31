import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoSync } from '../../../../interfaces/admin/video-sync';
import { CommonModule } from '@angular/common';
import { ConvertDescriptionPipe } from '../../../../services/general/convert-description-pipe/convert-description.pipe';

@Component({
  selector: 'app-video-sync-description',
  standalone: true,
  imports: [CommonModule, ConvertDescriptionPipe],
  templateUrl: './video-sync-description.component.html',
  styleUrl: './video-sync-description.component.scss',
})
export class VideoSyncDescriptionComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() video: VideoSync | null = null;

  public closeModal(): void {
    this.closePopUp.emit();
  }
}
