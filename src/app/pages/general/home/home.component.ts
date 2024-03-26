import { Component } from '@angular/core';
import { VideoChannel } from '../../../interfaces/general/video-channel';
import { VideoService } from '../../../services/general/video/video.service';
import { CategoryService } from '../../../services/general/category/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchHelperService } from '../../../services/general/search-helper/search-helper.service';
import { CommonModule } from '@angular/common';
import { CategorySelectionComponent } from '../../../common-components/general/category-selection/category-selection.component';
import { LoadingIconComponent } from '../../../common-components/general/loading-icon/loading-icon.component';
import { SearchResultComponent } from '../../../common-components/general/search-result/search-result.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CategorySelectionComponent,
    LoadingIconComponent,
    SearchResultComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isLoading: boolean = true;
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
        10,
        0
      )
      .subscribe({
        next: (response: VideoChannel[]) => {
          this.videoWithChannelList = response;
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
    const category: string = this.searchHelperService.getCategory();
    const search: String = this.searchHelperService.getSearch();

    this.router.navigate(['/home'], {
      queryParams: { category: category, search: search },
    });
  }
}
