import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { CommonModule } from '@angular/common';
import { ConvertDescriptionPipe } from '../../../services/general/convert-description-pipe/convert-description.pipe';
import { Router } from '@angular/router';
import { VideoUtilsService } from '../../../services/general/video-utils/video-utils.service';

@Component({
  selector: 'app-single-video',
  standalone: true,
  imports: [CommonModule, ConvertDescriptionPipe],
  templateUrl: './single-video.component.html',
  styleUrl: './single-video.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleVideoComponent {
  @Input() videoChannel: VideoChannel | null = null;

  constructor(
    private router: Router,
    public videoUtilsService: VideoUtilsService
  ) {}

  public navigateToChannelPage(channelId: string): void {
    this.router.navigate(['/channel/' + channelId]);
  }
}
