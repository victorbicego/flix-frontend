import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TableComponent } from './table/table.component';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { DeleteVideoSyncComponent } from './delete-video-sync/delete-video-sync.component';
import { VideoSyncDescriptionComponent } from './video-sync-description/video-sync-description.component';
import { VideoSync } from '../../../interfaces/admin/video-sync';
import { CategoryService } from '../../../services/general/category/category.service';
import { AdminVideoSyncService } from '../../../services/admin/video-sync/admin-video-sync.service';
import { UpdateVideoSyncComponent } from './update-video-sync/update-video-sync.component';
import { SyncLoadingComponent } from './sync-loading/sync-loading.component';

@Component({
  selector: 'app-video-sync-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    DeleteVideoSyncComponent,
    VideoSyncDescriptionComponent,
    TablePaginationComponent,
    UpdateVideoSyncComponent,
    SyncLoadingComponent,
  ],
  templateUrl: './video-sync-table.component.html',
  styleUrl: './video-sync-table.component.scss',
})
export class VideoSyncTableComponent implements OnInit {
  videoList: VideoSync[] = [];
  currentPage = 0;
  pageSize = 10;
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  isDescriptionModalOpen = false;
  videoToWork: VideoSync | null = null;
  categoryList: string[] = [];
  isSyncInProcess: boolean = false;

  constructor(
    private adminVideoSyncService: AdminVideoSyncService,
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
    this.adminVideoSyncService
      .getVideosSync(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: VideoSync[]) => {
          this.videoList = response;
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching users from the backend', error);
        },
      });
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
    this.isSyncInProcess = true;
    //this.renderer.addClass(document.body, 'no-scroll');
    this.adminVideoSyncService.syncVideos().subscribe({
      next: () => {
        this.getVideos();
        this.isSyncInProcess = false;
      },
      error: (error) => {
        console.error('Error fetching users from the backend', error);
      },
    });
  }

  public closeUpdateModal(): void {
    this.getVideos();
    this.isUpdateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openUpdateModal(video: VideoSync): void {
    this.videoToWork = video;
    this.isUpdateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeDeleteModal(): void {
    this.getVideos();
    this.isDeleteModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openDeleteModal(video: VideoSync): void {
    this.videoToWork = video;
    this.isDeleteModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeDescriptionModal(): void {
    this.isDescriptionModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openDescriptionModal(video: VideoSync): void {
    this.videoToWork = video;
    this.isDescriptionModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }
}
