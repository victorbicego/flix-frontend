import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminChannelService } from '../../../../services/admin/channel/admin-channel.service';
import { Channel } from '../../../../interfaces/general/channel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss',
})
export class CreateChannelComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  channelForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminChannelService: AdminChannelService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.channelForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      mainLink: ['', [Validators.required]],
      logoLink: ['', [Validators.required]],
      backgroundLink: ['', [Validators.required]],
      tag: ['', [Validators.required]],
    });
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public createChannel(): void {
    if (this.channelForm && this.channelForm.valid) {
      this.adminChannelService.saveChannel(this.channelForm.value).subscribe({
        next: (response: Channel) => {
          console.log('Channel saved successfully with ID:', response.id);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error occurred while saving channel:', error);
        },
      });
    } else {
      console.error('Form is invalid. Cannot save channel.');
    }
  }
}
