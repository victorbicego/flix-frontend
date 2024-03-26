import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class VideoUtilsService {
  constructor(private sanitizer: DomSanitizer) {}

  public getYouTubeThumbnailUrl(videoLink: string): SafeResourceUrl {
    const videoId = this.extractVideoYoutubeId(videoLink);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(thumbnailUrl);
  }

  private extractVideoYoutubeId(videoLink: string): string {
    const match = videoLink.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : '';
  }

  public getYouTubeEmbedUrl(videoLink: string): SafeResourceUrl {
    const videoId = this.extractVideoYoutubeId(videoLink);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
