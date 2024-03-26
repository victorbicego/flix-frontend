import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { SearchHelperService } from '../../../services/general/search-helper/search-helper.service';

@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [CommonModule, CategoryCardComponent],
  templateUrl: './category-selection.component.html',
  styleUrl: './category-selection.component.scss',
})
export class CategorySelectionComponent {
  @Output() changeCategory: EventEmitter<void> = new EventEmitter<void>();
  @Input() categoryList: string[] = [];

  constructor(public searchHelperService: SearchHelperService) {}

  public emitChangeCategory(category: string): void {
    this.searchHelperService.setCategory(category);
    this.changeCategory.emit();
  }
}
