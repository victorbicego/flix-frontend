import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Channel } from '../../../../interfaces/general/channel';
import { AdminChannelService } from '../../../../services/admin/channel/admin-channel.service';

@Component({
  selector: 'app-update-channel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-channel.component.html',
  styleUrl: './update-channel.component.scss',
})
export class UpdateChannelComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() channelToEdit: Channel | null = null;
  channelForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminChannelService: AdminChannelService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.channelToEdit) {
      this.channelForm = this.formBuilder.group({
        id: [this.channelToEdit.id],
        name: [this.channelToEdit.name, [Validators.required]],
        mainLink: [this.channelToEdit.mainLink, [Validators.required]],
        logoLink: [this.channelToEdit.logoLink, [Validators.required]],
        backgroundLink: [
          this.channelToEdit.backgroundLink,
          [Validators.required],
        ],
      });
    }
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public updateChannel(): void {
    if (this.channelForm && this.channelForm.valid) {
      this.adminChannelService.saveChannel(this.channelForm.value).subscribe({
        next: (response: Channel) => {
          console.log('Channel updated successfully with ID:', response.id);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error occurred while updating channel:', error);
        },
      });
    } else {
      console.error('Form is invalid. Cannot update channel.');
    }
  }
}
