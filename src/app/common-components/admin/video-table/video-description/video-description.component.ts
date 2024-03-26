import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../../../../interfaces/general/video';
import { ConvertDescriptionPipe } from '../../../../services/general/convert-description-pipe/convert-description.pipe';

@Component({
  selector: 'app-video-description',
  standalone: true,
  imports: [CommonModule, ConvertDescriptionPipe],
  templateUrl: './video-description.component.html',
  styleUrl: './video-description.component.scss',
})
export class VideoDescriptionComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() video: Video | null = null;

  public closeModal(): void {
    this.closePopUp.emit();
  }
}
