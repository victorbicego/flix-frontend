import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../../services/general/channel/channel.service';
import { Channel } from '../../../interfaces/general/channel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-channels-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channels-slider.component.html',
  styleUrl: './channels-slider.component.scss',
})
export class ChannelsSliderComponent implements OnInit {
  channelList: Channel[] = [];
  firstElementIndex = 0;
  lastElementIndex = 7;
  visibleChannels: Channel[] = [];
  transitioningLeft: boolean = false;
  transitioningRight: boolean = false;

  constructor(private channelService: ChannelService, private router: Router) {}

  ngOnInit(): void {
    this.getChannels();
  }

  private getChannels(): void {
    this.channelService.getAllChannels().subscribe({
      next: (response: Channel[]) => {
        this.channelList = response;
        this.updateVisibleChannels();
      },
      error: (error) => {
        console.error('Error fetching channels from the backend', error);
      },
    });
  }

  next(): void {
    if (!this.transitioningLeft) {
      this.transitioningLeft = true;
      setTimeout(() => {
        if (this.lastElementIndex == this.channelList.length) {
          this.channelList.push(this.channelList[0]);
          this.channelList.shift();
        } else {
          this.firstElementIndex++;
          this.lastElementIndex++;
        }
        this.updateVisibleChannels();
        this.transitioningLeft = false;
      }, 500);
    }
  }

  prev(): void {
    if (!this.transitioningRight) {
      this.transitioningRight = true;
      setTimeout(() => {
        if (this.firstElementIndex == 0) {
          this.channelList.unshift(
            this.channelList[this.channelList.length - 1]
          );
          this.channelList.pop();
        } else {
          this.firstElementIndex--;
          this.lastElementIndex--;
        }
        this.updateVisibleChannels();
        this.transitioningRight = false;
      }, 500);
    }
  }

  private updateVisibleChannels(): void {
    this.visibleChannels = this.channelList.slice(
      this.firstElementIndex,
      this.lastElementIndex
    );
  }

  public navigateToChannelPage(channelId: string): void {
    this.router.navigate(['/channel/' + channelId], {
      queryParams: { category: 'ALL' },
    });
  }
}
