import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { Video } from '../../../interfaces/general/video';
import { AdminVideoService } from '../../../services/admin/video/admin-video.service';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import { DeleteVideoComponent } from './delete-video/delete-video.component';
import { CreateVideoComponent } from './create-video/create-video.component';
import { CategoryService } from '../../../services/general/category/category.service';
import { UpdateVideoComponent } from './update-video/update-video.component';
import { VideoDescriptionComponent } from './video-description/video-description.component';

@Component({
  selector: 'app-video-table',
  standalone: true,
  imports: [
    CommonModule,
    TablePaginationComponent,
    TableComponent,
    DeleteVideoComponent,
    CreateVideoComponent,
    UpdateVideoComponent,
    VideoDescriptionComponent,
  ],
  templateUrl: './video-table.component.html',
  styleUrl: './video-table.component.scss',
})
export class VideoTableComponent implements OnInit {
  @Input() environment: string | null = null;
  videoList: Video[] = [];
  currentPage = 0;
  pageSize = 10;
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  isDescriptionModalOpen = false;
  videoToWork: Video | null = null;
  categoryList: string[] = [];

  constructor(
    private adminVideoService: AdminVideoService,
    private categoryService: CategoryService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getCategoryList();
    this.getVideos();
  }

  private getCategoryList(): void {
    this.categoryService.getCategoryList().subscribe({
      next: (response: string[]) => {
        this.categoryList = response;
        if (this.categoryList.length > 0) {
          this.categoryList.splice(this.categoryList.indexOf('ALL'), 1);
        }
      },
      error: (error) => {
        console.error('Error fetching categories from the backend', error);
      },
    });
  }

  private getVideos(): void {
    if (this.environment === 'core') {
      this.adminVideoService
        .getVideosCore(this.currentPage, this.pageSize)
        .subscribe({
          next: (response: Video[]) => {
            this.videoList = response;
          },
          error: (error) => {
            console.error('Error fetching users from the backend', error);
          },
        });
    } else if (this.environment === 'feed') {
      this.adminVideoService
        .getVideosFeed(this.currentPage, this.pageSize)
        .subscribe({
          next: (response: Video[]) => {
            this.videoList = response;
          },
          error: (error) => {
            console.error('Error fetching users from the backend', error);
          },
        });
    }
  }

  public nextPage(): void {
    this.currentPage++;
    this.getVideos();
  }

  public prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getVideos();
    }
  }

  public changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.getVideos();
  }

  public closeCreateModal(): void {
    this.getVideos();
    this.isCreateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openCreateModal(): void {
    this.isCreateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeUpdateModal(): void {
    this.getVideos();
    this.isUpdateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openUpdateModal(video: Video): void {
    this.videoToWork = video;
    this.isUpdateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeDeleteModal(): void {
    this.getVideos();
    this.isDeleteModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openDeleteModal(video: Video): void {
    this.videoToWork = video;
    this.isDeleteModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeDescriptionModal(): void {
    this.isDescriptionModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openDescriptionModal(video: Video): void {
    this.videoToWork = video;
    this.isDescriptionModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }
}
