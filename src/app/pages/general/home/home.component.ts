import { Component, HostListener, OnInit } from '@angular/core';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { VideoService } from '../../../services/general/video/video.service';
import { CategoryService } from '../../../services/general/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchHelperService } from '../../../services/general/search-helper/search-helper.service';
import { CommonModule } from '@angular/common';
import { CategorySelectionComponent } from '../../../common-components/general/category-selection/category-selection.component';
import { LoadingIconComponent } from '../../../common-components/general/loading-icon/loading-icon.component';
import { SearchResultComponent } from '../../../common-components/general/search-result/search-result.component';
import { ChannelsSliderComponent } from '../../../common-components/general/channels-slider/channels-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CategorySelectionComponent,
    LoadingIconComponent,
    SearchResultComponent,
    ChannelsSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isLoading: boolean = true;
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
    private searchHelperService: SearchHelperService
  ) {}

  ngOnInit(): void {
    this.changedCategory = true;
    this.pageNumber = 0;
    this.isPageEnd = false;
    this.getCategoryList();
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.searchHelperService.setSearch(queryParams['search']);
      this.searchHelperService.setCategory(queryParams['category']);
      this.searchHelperService.setChannel('');
      if (this.searchHelperService.getCategory()) {
        this.getVideos();
      } else {
        this.searchHelperService.setCategory('ALL');
        this.changeCategory();
      }
    });
  }

  private getVideos(): void {
    this.videoService
      .getVideoList(
        this.searchHelperService.getChannel(),
        this.searchHelperService.getCategory(),
        this.searchHelperService.getSearch(),
        16,
        this.pageNumber
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
    const category: string = this.searchHelperService.getCategory();
    const search: String = this.searchHelperService.getSearch();

    this.changedCategory = true;
    this.pageNumber = 0;
    this.isPageEnd = false;
    this.router.navigate(['/home'], {
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
