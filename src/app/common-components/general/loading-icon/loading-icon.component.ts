import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-icon.component.html',
  styleUrl: './loading-icon.component.scss',
})
export class LoadingIconComponent {
  @Input() isLoading: boolean = false;
}
