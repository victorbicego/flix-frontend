import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoSync } from '../../../../interfaces/admin/video-sync';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminVideoSyncService } from '../../../../services/admin/video-sync/admin-video-sync.service';

@Component({
  selector: 'app-update-video-sync',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-video-sync.component.html',
  styleUrl: './update-video-sync.component.scss',
})
export class UpdateVideoSyncComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() categoryList: string[] = [];
  @Input() videoToEdit: VideoSync | null = null;
  videoForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminVideoSyncService: AdminVideoSyncService
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
        duration: [this.videoToEdit.duration, [Validators.required]],
      });
    }
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public updateVideo(): void {
    if (this.videoForm && this.videoForm.valid) {
      this.adminVideoSyncService
        .updateVideoSync(this.videoForm.value.id, this.videoForm.value)
        .subscribe({
          next: (response: VideoSync) => {
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
}
