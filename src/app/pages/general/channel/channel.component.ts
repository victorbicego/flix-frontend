import { Component, HostListener, OnInit } from '@angular/core';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { Channel } from '../../../interfaces/general/channel';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../../../services/general/video/video.service';
import { CategoryService } from '../../../services/general/category/category.service';
import { CommonModule } from '@angular/common';
import { LoadingIconComponent } from '../../../common-components/general/loading-icon/loading-icon.component';
import { SearchResultComponent } from '../../../common-components/general/search-result/search-result.component';
import { CategorySelectionComponent } from '../../../common-components/general/category-selection/category-selection.component';
import { SearchHelperService } from '../../../services/general/search-helper/search-helper.service';
import { ChannelService } from '../../../services/general/channel/channel.service';

@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [
    CommonModule,
    LoadingIconComponent,
    SearchResultComponent,
    CategorySelectionComponent,
  ],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss',
})
export class ChannelComponent implements OnInit {
  isLoading: boolean = true;
  channel: Channel | null = null;
  videoWithChannelList: VideoChannel[] = [];
  categoryList: string[] = [];
  pageNumber: number = 0;
  isPageEnd: boolean = false;
  changedCategory: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private categoryService: CategoryService,
    private searchHelperService: SearchHelperService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    this.changedCategory = true;
    this.pageNumber = 0;
    this.isPageEnd = false;
    this.getCategoryList();
    this.activatedRoute.params.subscribe((params) => {
      this.searchHelperService.setChannel(params['id']);
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        this.searchHelperService.setSearch(queryParams['search']);
        this.searchHelperService.setCategory(queryParams['category']);
        this.getVideos();
      });
    });
    this.getChannel();
  }

  private getChannel(): void {
    this.channelService
      .getSingleChannel(this.searchHelperService.getChannel())
      .subscribe({
        next: (response: Channel) => {
          this.channel = response;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error fetching videos from the backend', error);
        },
      });
  }

  private getVideos(): void {
    this.videoService
      .getVideoList(
        this.searchHelperService.getChannel(),
        this.searchHelperService.getCategory(),
        this.searchHelperService.getSearch(),
        16,
        0
      )
      .subscribe({
        next: (response: VideoChannel[]) => {
          if (this.changedCategory) {
            this.videoWithChannelList = response;
          } else if (!this.changedCategory) {
            this.videoWithChannelList.push(...response);
          }
          this.isLoading = false;
          if (response.length < 16) {
            this.isPageEnd = true;
          }
        },
        error: (error) => {
          console.error('Error fetching videos from the backend', error);
        },
      });
  }

  private getCategoryList(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (response: string[]) => {
        this.categoryList = response;
      },
      error: (error) => {
        console.error('Error fetching categories from the backend', error);
      },
    });
  }

  public changeCategory(): void {
    const channel: string = this.searchHelperService.getChannel();
    const category: string = this.searchHelperService.getCategory();
    const search: String = this.searchHelperService.getSearch();

    this.changedCategory = true;
    this.pageNumber = 0;
    this.isPageEnd = false;
    this.router.navigate(['/channel/' + channel], {
      queryParams: { category: category, search: search },
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && !this.isLoading && !this.isPageEnd) {
      this.changedCategory = false;
      this.isLoading = true;
      setTimeout(() => {
        this.pageNumber++;
        this.getVideos();
      }, 500);
    }
  }
}
