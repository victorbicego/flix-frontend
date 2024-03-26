import { Component, OnInit } from '@angular/core';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
    private categoryService: CategoryService,
    private searchHelperService: SearchHelperService
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.activatedRoute.params.subscribe((params) => {
      this.searchHelperService.setChannel(params['id']);
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        this.searchHelperService.setSearch(queryParams['search']);
        this.searchHelperService.setCategory(queryParams['category']);
        this.getVideos();
      });
    });
  }

  private getVideos(): void {
    this.videoService
      .getVideoList(
        this.searchHelperService.getChannel(),
        this.searchHelperService.getCategory(),
        this.searchHelperService.getSearch(),
        10,
        0
      )
      .subscribe({
        next: (response: VideoChannel[]) => {
          this.videoWithChannelList = response;
          this.channel = this.videoWithChannelList[0].channel;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
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

    this.router.navigate(['/channel/' + channel], {
      queryParams: { category: category, search: search },
    });
  }
}
