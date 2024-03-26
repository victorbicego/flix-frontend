import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { TablePaginationComponent } from '../table-pagination/table-pagination.component';
import { Channel } from '../../../interfaces/general/channel';
import { AdminChannelService } from '../../../services/admin/channel/admin-channel.service';
import { TableComponent } from './table/table.component';
import { CommonModule } from '@angular/common';
import { DeleteChannelComponent } from './delete-channel/delete-channel.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { UpdateChannelComponent } from './update-channel/update-channel.component';

@Component({
  selector: 'app-channel-table',
  standalone: true,
  imports: [
    CommonModule,
    TablePaginationComponent,
    TableComponent,
    DeleteChannelComponent,
    CreateChannelComponent,
    UpdateChannelComponent,
  ],
  templateUrl: './channel-table.component.html',
  styleUrl: './channel-table.component.scss',
})
export class ChannelTableComponent implements OnInit {
  @Input() environment: string | null = null;
  channelList: Channel[] = [];
  currentPage = 0;
  pageSize = 10;
  isCreateModalOpen = false;
  isUpdateModalOpen = false;
  isDeleteModalOpen = false;
  channelToWork: Channel | null = null;

  constructor(
    private adminChannelService: AdminChannelService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getChannels();
  }

  private getChannels(): void {
    if (this.environment === 'core') {
      this.adminChannelService
        .getChannelsCore(this.currentPage, this.pageSize)
        .subscribe({
          next: (response: Channel[]) => {
            this.channelList = response;
          },
          error: (error) => {
            console.error('Error fetching users from the backend', error);
          },
        });
    }
  }

  public nextPage(): void {
    this.currentPage++;
    this.getChannels();
  }

  public prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getChannels();
    }
  }

  public changePageSize(size: number): void {
    this.pageSize = size;
    this.currentPage = 0;
    this.getChannels();
  }

  public closeCreateModal(): void {
    this.getChannels();
    this.isCreateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openCreateModal(): void {
    this.isCreateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeUpdateModal(): void {
    this.getChannels();
    this.isUpdateModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openUpdateModal(channel: Channel): void {
    this.channelToWork = channel;
    this.isUpdateModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }

  public closeDeleteModal(): void {
    this.getChannels();
    this.isDeleteModalOpen = false;
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  public openDeleteModal(channel: Channel): void {
    this.channelToWork = channel;
    this.isDeleteModalOpen = true;
    this.renderer.addClass(document.body, 'no-scroll');
  }
}
