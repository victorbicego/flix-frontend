import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Channel } from '../../../../interfaces/general/channel';
import { AdminChannelService } from '../../../../services/admin/channel/admin-channel.service';

@Component({
  selector: 'app-delete-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-channel.component.html',
  styleUrl: './delete-channel.component.scss',
})
export class DeleteChannelComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() channelToDelete: Channel | null = null;
  @Input() environment: string | null = null;

  constructor(private adminChannelService: AdminChannelService) {}

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public deleteChannel(): void {
    if (this.channelToDelete) {
      this.adminChannelService
        .deleteChannelCore(this.channelToDelete.id!)
        .subscribe({
          next: () => {
            console.log(
              'Channel delete successfully with ID:',
              this.channelToDelete!.id
            );
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while deleting channel:', error);
          },
        });
    }
  }
}
