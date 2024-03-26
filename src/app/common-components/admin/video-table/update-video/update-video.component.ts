import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Video } from '../../../../interfaces/general/video';
import { AdminVideoService } from '../../../../services/admin/video/admin-video.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-video',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-video.component.html',
  styleUrl: './update-video.component.scss',
})
export class UpdateVideoComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() environment: string | null = null;
  @Input() categoryList: string[] = [];
  @Input() videoToEdit: Video | null = null;
  videoForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminVideoService: AdminVideoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.videoToEdit) {
      this.videoForm = this.formBuilder.group({
        id: [this.videoToEdit.id],
        title: [this.videoToEdit.title, [Validators.required]],
        link: [this.videoToEdit.link, [Validators.required]],
        date: [this.videoToEdit.date, [Validators.required]],
        description: [this.videoToEdit.description, [Validators.required]],
        channelId: [this.videoToEdit.channelId, [Validators.required]],
        category: [this.videoToEdit.category, [Validators.required]],
      });
    }
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public updateVideo(): void {
    if (this.environment === 'core') {
      this.updateVideoCore();
    }
    if (this.environment === 'feed') {
      this.updateVideoFeed();
    }
  }

  private updateVideoCore(): void {
    if (this.videoForm && this.videoForm.valid) {
      this.adminVideoService
        .updateVideoCore(this.videoForm.value.id, this.videoForm.value)
        .subscribe({
          next: (response: Video) => {
            console.log('Video saved successfully with ID:', response.id);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while updating video:', error);
          },
        });
    } else {
      console.error('Form is invalid. Cannot update video.');
    }
  }

  private updateVideoFeed(): void {
    if (this.videoForm && this.videoForm.valid) {
      this.adminVideoService
        .updateVideoFeed(this.videoForm.value.id, this.videoForm.value)
        .subscribe({
          next: (response: Video) => {
            console.log('Video updated successfully with ID:', response.id);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while updating video:', error);
          },
        });
    } else {
      console.error('Form is invalid. Cannot update video.');
    }
  }
}
