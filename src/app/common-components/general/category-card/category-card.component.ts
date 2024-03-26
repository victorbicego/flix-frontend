import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Output() changeCategory: EventEmitter<string> = new EventEmitter<string>();
  @Input() category: string | null = null;
  @Input() isSelected: boolean = false;

  constructor() {}

  public emitChangeCategory(category: string): void {
    this.changeCategory.emit(category);
  }
}
