import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminVideoService } from '../../../../services/admin/video/admin-video.service';
import { Video } from '../../../../interfaces/general/video';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss',
})
export class CreateVideoComponent implements OnInit {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() environment: string | null = null;
  @Input() categoryList: string[] = [];
  videoForm: FormGroup | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private adminVideoService: AdminVideoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.videoForm = this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required]],
      link: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      channelId: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public createVideo(): void {
    if (this.environment === 'core') {
      this.createVideoCore();
    }
    if (this.environment === 'feed') {
      this.createVideoFeed();
    }
  }

  private createVideoCore(): void {
    if (this.videoForm && this.videoForm.valid) {
      this.adminVideoService.saveVideoCore(this.videoForm.value).subscribe({
        next: (response: Video) => {
          console.log('Video saved successfully with ID:', response.id);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error occurred while saving video:', error);
        },
      });
    } else {
      console.error('Form is invalid. Cannot save video.');
    }
  }

  private createVideoFeed(): void {
    if (this.videoForm && this.videoForm.valid) {
      this.adminVideoService.saveVideoFeed(this.videoForm.value).subscribe({
        next: (response: Video) => {
          console.log('Video saved successfully with ID:', response.id);
          this.closeModal();
        },
        error: (error) => {
          console.error('Error occurred while saving video:', error);
        },
      });
    } else {
      console.error('Form is invalid. Cannot save video.');
    }
  }
}
