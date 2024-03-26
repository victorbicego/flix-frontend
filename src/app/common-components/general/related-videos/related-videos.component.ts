import { Component, Input, OnInit } from '@angular/core';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../../services/general/video/video.service';
import { Router } from '@angular/router';
import { VideoUtilsService } from '../../../services/general/video-utils/video-utils.service';

@Component({
  selector: 'app-related-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './related-videos.component.html',
  styleUrl: './related-videos.component.scss',
})
export class RelatedVideosComponent implements OnInit {
  @Input() videoId: string | null = null;
  recommendedVideos: VideoChannel[] = [];

  constructor(
    private videoService: VideoService,
    public videoUtilsService: VideoUtilsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.videoId) {
      this.getRelatedVideos(this.videoId);
    }
  }

  public getRelatedVideos(videoId: string): void {
    this.videoService.getRelatedVideos(videoId).subscribe({
      next: (response: VideoChannel[]) => {
        this.recommendedVideos = response;
      },
      error: (error) => {
        console.error('Error fetching related videos from the backend', error);
      },
    });
  }

  public navigateToSingleVideo(videoId: string): void {
    this.router.navigate(['/video/' + videoId]);
  }

  public navigateToChannel(channelId: string): void {
    this.router.navigate(['/channel/' + channelId]);
  }
}
