import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { VideoUtilsService } from '../../../services/general/video-utils/video-utils.service';
import { Router } from '@angular/router';
import { ConvertDurationPipe } from '../../../services/general/convert-duration-pipe/convert-duration.pipe';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, ConvertDurationPipe],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent {
  @Input() videoWithChannelList: VideoChannel[] = [];

  constructor(
    public videoUtilsService: VideoUtilsService,
    private router: Router
  ) {}

  public navigateToSingleVideo(videoId: string): void {
    this.router.navigate(['/video/' + videoId]);
  }

  public navigateToChannelPage(channelId: string): void {
    this.router.navigate(['/channel/' + channelId], {
      queryParams: { category: 'ALL' },
    });
  }
}
