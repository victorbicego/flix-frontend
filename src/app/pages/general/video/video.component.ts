import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RelatedVideosComponent } from '../../../common-components/general/related-videos/related-videos.component';
import { SingleVideoComponent } from '../../../common-components/general/single-video/single-video.component';
import { LoadingIconComponent } from '../../../common-components/general/loading-icon/loading-icon.component';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { VideoService } from '../../../services/general/video/video.service';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [
    CommonModule,
    RelatedVideosComponent,
    SingleVideoComponent,
    LoadingIconComponent,
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss',
})
export class VideoComponent implements OnInit {
  videoChannel: VideoChannel | null = null;
  isLoading: boolean = true;

  @ViewChild(RelatedVideosComponent)
  relatedVideosComponent!: RelatedVideosComponent;

  constructor(
    private videoService: VideoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getSingleVideo(params['id']);
    });
  }

  private getSingleVideo(id: string): void {
    this.videoService.getSingleVideo(id).subscribe({
      next: (response: VideoChannel) => {
        this.videoChannel = response;
        this.isLoading = false;
        if (this.relatedVideosComponent) {
          this.relatedVideosComponent.getRelatedVideos(
            this.videoChannel.video.id
          );
        }
      },
      error: (error) => {
        console.error('Error fetching single video from the backend', error);
      },
    });
  }
}
