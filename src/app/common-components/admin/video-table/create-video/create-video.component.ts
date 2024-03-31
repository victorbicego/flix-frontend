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
import { Channel } from '../../../../interfaces/general/channel';

@Component({
  selector: 'app-create-video',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-video.component.html',
  styleUrl: './create-video.component.scss',
})
export class CreateVideoComponent implements OnInit {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() categoryList: string[] = [];
  @Input() channelList: Channel[] = [];
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
      durationHours: [0],
      durationMinutes: [0, [Validators.min(0), Validators.max(60)]],
      durationSeconds: [0, [Validators.min(0), Validators.max(60)]],
      duration: [],
    });
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public createVideo(): void {
    if (this.videoForm && this.videoForm.valid) {
      const hours = this.videoForm.get('durationHours')?.value || '0';
      const minutes = this.videoForm.get('durationMinutes')?.value || '0';
      const seconds = this.videoForm.get('durationSeconds')?.value || '0';
      let duration = 'PT';

      if (hours != '0') {
        duration = duration + hours + 'H';
      }

      if (minutes != '0') {
        duration = duration + minutes + 'M';
      }

      duration = duration + seconds + 'S';
      this.videoForm.get('duration')?.setValue(duration);

      this.adminVideoService.saveVideo(this.videoForm.value).subscribe({
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

  public onDurationMinutesInput(event: any): void {
    const inputValue = parseInt(event.target.value, 10);
    if (inputValue > 60) {
      this.videoForm!.get('durationMinutes')!.setValue(60);
    }
  }

  public onDurationSecondsInput(event: any): void {
    const inputValue = parseInt(event.target.value, 10);
    if (inputValue > 60) {
      this.videoForm!.get('durationSeconds')!.setValue(60);
    }
  }
}
