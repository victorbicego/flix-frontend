import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchHelperService } from '../../../services/general/search-helper/search-helper.service';
import { StorageService } from '../../../services/admin/storage/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(
    private router: Router,
    private searchHelperService: SearchHelperService,
    public storageService: StorageService
  ) {}

  onSearch(): void {
    this.searchHelperService.setSearch(this.searchTerm);
    const category: string = this.searchHelperService.getCategory();
    const search: String = this.searchHelperService.getSearch();

    this.router.navigate(['/home'], {
      queryParams: { category: category, search: search },
    });
  }

  public clear(): void {
    this.clearAllFields();
    this.router.navigate(['/home']);
  }

  public clearAllFields(): void {
    this.searchTerm = '';
    this.searchHelperService.setCategory('');
    this.searchHelperService.setSearch('');
    this.searchHelperService.setChannel('');
  }
}
