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
import { Channel } from '../../../../interfaces/general/channel';

@Component({
  selector: 'app-update-video',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-video.component.html',
  styleUrl: './update-video.component.scss',
})
export class UpdateVideoComponent {
  @Output() closePopUp: EventEmitter<void> = new EventEmitter<void>();
  @Input() categoryList: string[] = [];
  @Input() channelList: Channel[] = [];
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
      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      if (this.videoToEdit.duration) {
        const matchHour = this.videoToEdit!.duration!.match(/(\d+H)/)!;
        const matchMinute = this.videoToEdit!.duration!.match(/(\d+M)/)!;
        const matchSecond =
          this.videoToEdit!.duration!.match(/(\d+(?:\.\d+)?)S/)!;
        if (matchHour) {
          hours = parseInt(matchHour[1], 10);
        }

        if (matchMinute) {
          minutes = parseInt(matchMinute[1], 10);
        }

        if (matchSecond) {
          seconds = parseInt(matchSecond[1], 10);
        }
      }

      this.videoForm = this.formBuilder.group({
        id: [this.videoToEdit.id],
        title: [this.videoToEdit.title, [Validators.required]],
        link: [this.videoToEdit.link, [Validators.required]],
        date: [this.videoToEdit.date, [Validators.required]],
        description: [this.videoToEdit.description, [Validators.required]],
        channelId: [this.videoToEdit.channelId, [Validators.required]],
        category: [this.videoToEdit.category, [Validators.required]],
        durationHours: [hours],
        durationMinutes: [minutes, [Validators.min(0), Validators.max(60)]],
        durationSeconds: [seconds, [Validators.min(0), Validators.max(60)]],
        duration: [],
      });
    }
  }

  public closeModal(): void {
    this.closePopUp.emit();
  }

  public updateVideo(): void {
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

      this.adminVideoService
        .updateVideo(this.videoForm.value.id, this.videoForm.value)
        .subscribe({
          next: (response: Video) => {
            console.log('Video saved successfully with ID:', response.id);
            this.closeModal();
          },
          error: (error) => {
            console.error('Error occurred while updating video:', error);
          },
        });
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
